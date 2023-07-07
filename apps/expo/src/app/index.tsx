import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Dimensions, View, TextInput, FlatList, Text, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';

import Svg, {Path} from "react-native-svg";
import * as Speech from 'expo-speech';

import { getRedditFrontPagePosts, loadMorePosts } from '~/utils/reddit';
import RedditCard from '~/components/post';


const HEADER_HEIGHT = 60;
const APPBAR_HEIGHT = 130;

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [subreddit, setSubreddit] = useState('twosentencehorror');
  const [subredditInput, setSubredditInput] = useState('twosentencehorror');
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState('');
  const [currentPost, setCurrentPost] = useState(0);
  const flatListRef = useRef(null);

  const LIST_VIEW_HEIGHT = Dimensions.get("window").height - 100;

  const fetchRedditPosts = async (subreddit) => {
    const newPosts = await getRedditFrontPagePosts(subreddit);
    setPosts(newPosts);
    setLoading(false);
  };

  const fetchMorePosts = async () => {
    setLoading(true);
    const newPosts = await loadMorePosts(subreddit, after);
    setPosts([...posts, ...newPosts]);
    setAfter(newPosts[newPosts.length - 1].id);
  };

  const handleChangeSubreddit = (newSubreddit) => {
    setLoading(true);
    setSubreddit(newSubreddit);
  };

  const renderItem = ({ item, index }) => (
    <RedditCard post={item} height={LIST_VIEW_HEIGHT} isActive={index === currentPost} />
  );

  const readPost = (index) => {
    Speech.stop();

    // Read the post.
    Speech.speak(posts[index].title + ' ' + posts[index].body);
  }

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const visibleIndex = Math.max(0, Math.floor(offsetY / LIST_VIEW_HEIGHT));

    if (visibleIndex !== currentPost) {
      setCurrentPost(visibleIndex);
      readPost(visibleIndex);
    }
  };

  useEffect(() => {
    fetchRedditPosts(subreddit).then(() => {
      setLoading(false);
      readCurrentPost();
    });
  }, [subreddit]);

  return (
    <View className="bg-black">
      <SafeAreaView className="flex flex-col">
          <View className="flex flex-row items-center p-2">
            <TextInput
              placeholder="Enter Subreddit"
              className="bg-neutral-800 border-neutral-900 flex-1 p-2 rounded-md text-white placeholder-white"
              value={subredditInput}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setSubredditInput}
              onSubmitEditing={() => handleChangeSubreddit(subredditInput)}
            />

            <TouchableHighlight onPress={() => handleChangeSubreddit(subredditInput)}>
              <View className="w-12 h-12 flex items-center justify-center">
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={24}
                  width={24}
                  viewBox="0 0 512 512"
                  fill={'white'}
                >
                  <Path d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </Svg>
              </View>
            </TouchableHighlight>
          </View>
          {loading && (
            <View className="flex-1 flex items-center justify-center">
              <Text className="text-white">Loading...</Text>
            </View>
          )}
          {!loading && (
              <FlatList
                ref={flatListRef}
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={fetchMorePosts}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                snapToAlignment={"start"}
                snapToInterval={LIST_VIEW_HEIGHT}
                decelerationRate={0.0}
                pagingEnabled={true}
                disableIntervalMomentum={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                windowSize={10}
                style={{ height: LIST_VIEW_HEIGHT }}
              />
          )}


        {/* [For you page] */}
        <View className={'flex flex-row items-center justify-center absolute top-32 left-0 w-screen space-x-4'}>
          <Text className="text-white text-lg">Following</Text>
          <Text className="text-white text-lg font-bold">For You</Text>
        </View>
        {/* [/For you page] */}

        {/* [Navigator] */}
        <View style={{
          height: APPBAR_HEIGHT,
          }}
          className="flex flex-row items-start justify-around absolute bottom-0 left-0 w-screen bg-black pt-4"
        >
          <View className="flex flex-col items-center justify-center">
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              height={32}
              width={32}
              viewBox="0 0 576 512"
              fill={'white'}
            >
              <Path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1-1.4.1-2.8.1-4.2.1H392c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8v-69.6H32c-18 0-32-14-32-32.1 0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24z" />
            </Svg>
            <Text className={'text-white'}>Home</Text>
          </View>

          <View className="flex flex-col items-center justify-center">
          <Svg
              xmlns="http://www.w3.org/2000/svg"
              height={32}
              width={32}
              viewBox="0 0 512 512"
              fill={'white'}
            >
              <Path d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </Svg>
            <Text className={'text-white'}>Discover</Text>
          </View>

<View className="h-10 w-24 rounded-lg flex items-center justify-center bg-white" style={{
  marginTop: 2,
}}>
            <Text className="text-2xl text-black font-bold">+</Text>
          </View>

          <View className="flex flex-col items-center justify-center">
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              height={32}
              width={32}
              viewBox="0 0 512 512"
              fill={'white'}
            >
              <Path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h96zm48 124-.2.2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3v-80H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0h384c35.3 0 64 28.7 64 64v288c0 35.3-28.7 64-64 64H309.3L208 492z" />
            </Svg>
            <Text className={'text-white'}>Inbox</Text>
          </View>

          <View className="flex flex-col items-center justify-center">
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height={32}
              width={32}
              fill={'white'}
            >
              <Path d="M304 128a80 80 0 1 0-160 0 80 80 0 1 0 160 0zm-208 0a128 128 0 1 1 256 0 128 128 0 1 1-256 0zM49.3 464h349.4c-8.9-63.3-63.3-112-129-112h-91.4c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
            </Svg>
            <Text className={'text-white'}>Me</Text>
          </View>
        </View>
        {/* [/Navigator] */}
      </SafeAreaView>
    </View>
  );
};

export default MainPage;
