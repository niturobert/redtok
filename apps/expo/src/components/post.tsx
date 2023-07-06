import React from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import {Video} from 'expo-av';
import AuthorInfoComponent from '~/components/author';
import Svg, { Path } from 'react-native-svg';


export default function RedditCard({ post, height, isActive }) {
  return (
    <View className={'w-full bg-black relative'} style={{ height: height }}>
      <Video
        source={require('../assets/videos/subway_surfers_background_video.mp4')}
        className="absolute top-0 left-0 w-full h-full"
        shouldPlay={isActive}
        isLooping={isActive}
        volume={1}
        muted={true}
        resizeMode="cover"
      />

      {/* [Post content] */}
      <View className={'absolute top-8 left-[10vw] p-4 bg-black opacity-80 w-[80vw]'}>
        <AuthorInfoComponent username={post.author} profilePic={post.profilePic} createdAt={post.created_at} />
        <Text className={'text-white text-lg font-bold'}>{post.title}</Text>
        <Text className={'text-white text-sm font-normal mt-2'}>{post.body}</Text>
        {/* Render other post details as needed */}
      </View>
      {/* [/Post content] */}

      {/* [CTA buttons] */}
      <View className="flex flex-col absolute bottom-8 right-4 space-y-4 items-center justify-end">
        {/* [Number of likes] */}
        <View className="flex flex-col items-center justify-center space-x-2">
          <Svg
              xmlns="http://www.w3.org/2000/svg"
              height={32}
              width={32}
              viewBox="0 0 512 512"
              fill={"white"}
            >
              <Path d="m225.8 468.2-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144 39.4-7.6 79.7 1.5 111.8 24.1 9 6.4 17.4 13.8 25 22.3 4.2-4.8 8.7-9.2 13.5-13.3 3.7-3.2 7.5-6.2 11.5-9 32.1-22.6 72.4-31.7 111.8-24.2C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1c-23.1-25.9-58-37.7-92-31.2-46.6 8.9-80.2 49.5-80.2 96.9v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268a102.7 102.7 0 0 0 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9-34-6.5-69 5.4-92 31.2l-.1.1-.1.1-17.8 20c-.3.4-.7.7-1 1.1-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </Svg>
          <Text className="text-white text-lg font-bold text-center">{post.score ?? 0}</Text>
        </View>
        {/* [/Number of likes] */}

        {/* [Number of comments] */}
        <View className="flex flex-col items-center justify-center space-x-2">
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            height={32}
            width={32}
            viewBox="0 0 512 512"
            fill={"white"}
          >
            <Path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4 26.5 9.6 56.2 15.1 87.8 15.1 124.7 0 208-80.5 208-160S380.7 80 256 80 48 160.5 48 240c0 32 12.4 62.8 35.7 89.2 8.6 9.7 12.8 22.5 11.8 35.5-1.4 18.1-5.7 34.7-11.3 49.4 17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1 10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240 0 125.1 114.6 32 256 32s256 93.1 256 208-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9-11.9 8.7-31.3 20.6-54.3 30.6-15.1 6.6-32.3 12.6-50.1 16.1-.8.2-1.6.3-2.4.5-4.4.8-8.7 1.5-13.2 1.9-.2 0-.5.1-.7.1-5.1.5-10.2.8-15.3.8-6.5 0-12.3-3.9-14.8-9.9S0 457.4 4.5 452.8c4.1-4.2 7.8-8.7 11.3-13.5 1.7-2.3 3.3-4.6 4.8-6.9.1-.2.2-.3.3-.5z" />
          </Svg>
          <Text className="text-white text-lg font-bold">{post.num_comments ?? 0}</Text>
        </View>
        {/* [/Number of comments] */}
        {/* [Number of bookmarks/awards] */}
        <View className="flex flex-col items-center justify-center space-x-2">
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            height={32}
            width={32}
            viewBox="0 0 384 512"
            fill={'white'}
          >
            <Path d="M0 48C0 21.5 21.5 0 48 0v441.4l130.1-92.9c8.3-6 19.6-6 27.9 0l130 92.9V48H48V0h288c26.5 0 48 21.5 48 48v440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5l-154.1 110c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
          </Svg>
          <Text className="text-white text-lg font-bold">{post.total_awards_received ?? 0}</Text>
        </View>
        {/* [/Number of bookmarks/awards] */}


        {/* [Share the post] */}
        <View className="flex flex-col items-center justify-center space-x-2">
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            height={32}
            width={32}
            viewBox="0 0 512 512"
            fill={'white'}
          >
            <Path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304c0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5-9.4-8.9-22.2-26.4-22.2-56.8 0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144a31.76 31.76 0 0 0-34.4-5.4z" />
          </Svg>
        </View>
        {/* [/Share the post] */}
      </View>
      {/* [/CTA buttons */}
    </View>
);
};


// Missing:
// Author on bottom
// Author on the side
