import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Dimensions, View, TextInput, FlatList, Text, SafeAreaView, TouchableHighlight } from 'react-native';

import Svg, {Path} from "react-native-svg";
import * as Speech from 'expo-speech';

import { getRedditFrontPagePosts, loadMorePosts } from '~/utils/reddit';
import RedditCard from '~/components/post';


const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [subreddit, setSubreddit] = useState('twosentencehorror');
  const [subredditInput, setSubredditInput] = useState('twosentencehorror');
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState('');
  const [currentPost, setCurrentPost] = useState(0);

  const LIST_VIEW_HEIGHT = Dimensions.get("window").height - 124;


  const readCurrentPost = () => {
    // Interrupt the current speech.
    Speech.stop();
    
    // Read the current post.
    Speech.speak(posts[currentPost].title + ' ' + posts[currentPost].body);
  }

  const readCurrentPostCallback = (viewableItems)=> {
    if (viewableItems.length > 0) {
      window.alert(`Current index: ${viewableItems[0].index}`)
      setCurrentPost(viewableItems[0].index);
      readCurrentPost();
    } else {
      window.alert('No items in view');
    }
  }

  const viewabilityConfigCallbackPairs = useRef([
    { readCurrentPostCallback },
  ]);


  useEffect(() => {
    fetchRedditPosts(subreddit).then(() => {
      setLoading(false);
      readCurrentPost();
    });
  }, [subreddit]);

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

  const renderItem = ({ item }) => (
    <RedditCard post={item} height={LIST_VIEW_HEIGHT} isActive={true} />
  );

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
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          snapToAlignment={"start"}
          snapToInterval={Dimensions.get("window").height - 124}
          decelerationRate={0.0}
          pagingEnabled={true}
          disableIntervalMomentum={true}
          windowSize={3}

          // When an item is scrolled into view, read it.
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
          // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          onViewableItemsChanged={readCurrentPostCallback}
        />
        )}
      </SafeAreaView>
    </View>
  );
};

export default MainPage;
