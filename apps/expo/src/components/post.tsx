import React from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import {Video} from 'expo-av';
import AuthorInfoComponent from '~/components/author';
import Svg, { Path } from 'react-native-svg';


export default function RedditCard({ post, height, isActive }) {
  return (
    <View className={'w-full bg-black relative'} style={{ height: height }}>
      {/* [Background video] */}
      <Video
        source={require('../assets/videos/subway_surfers_background_video.mp4')}
        className="absolute top-0 left-0 w-full h-full"
        shouldPlay={isActive}
        isLooping={isActive}
        volume={1}
        muted={true}
        resizeMode="cover"
      />
      {/* [/Background video] */}

      {/* [Post content] */}
      <View className={'absolute top-8 left-[10vw] p-4 bg-black opacity-80 w-[80vw]'}>
        <AuthorInfoComponent username={post.author} profilePic={post.profilePic} createdAt={post.created_at} />
        <Text className={'text-white text-lg font-bold'}>{post.title}</Text>
        <Text className={'text-white text-sm font-normal mt-2'}>{post.body}</Text>
        {/* Render other post details as needed */}
      </View>
      {/* [/Post content] */}

      {/* [Author info] */}
      <View className="w-[80vw] h-[20vh] absolute bottom-32 left-[5vw] flex flex-col items-start justify-end">
        <Text className="font-semibold text-lg text-white">{post.author}</Text>
        <Text className="font-normal text-sm text-white">{post.body.substring(20)}</Text>
      </View>
      {/* [/Author info] */}

      {/* [CTA buttons] */}
      <View className="flex flex-col absolute bottom-32 right-4 space-y-4 items-center justify-end">
        {/* [Author photo w/ subscribe button] */}
        <View className="rounded-full bg-blue-600 p-2">
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="-4.771 0.104 53.521 44.858"
          >
            <Path
              fill="#FFF"
              d="M29.909 35.89c-1.999 1.997-5.218 2.382-7.921 2.382-2.7 0-5.922-.385-7.918-2.382M36.021 4.276 25.899 1.894l-3.93 11.996L25.9 1.894m18.241 3.201a3.99 3.99 0 1 1-7.98 0 3.991 3.991 0 0 1 7.98 0zm.661 23.906c0 8.262-10.263 14.961-22.922 14.961-12.66 0-22.922-6.698-22.922-14.961 0-8.262 10.262-14.961 22.922-14.961 12.659 0 22.922 6.698 22.922 14.961zM-.744 26.676a5.061 5.061 0 0 1-3.027-4.636 5.06 5.06 0 0 1 8.935-3.257m33.568.103a5.061 5.061 0 0 1 9.018 3.154 5.064 5.064 0 0 1-3.23 4.72"
            />
            <Path d="M21.879 44.963c-13.191 0-23.922-7.16-23.922-15.961 0-.608.051-1.21.151-1.801a6.066 6.066 0 0 1-2.879-5.161 6.068 6.068 0 0 1 6.06-6.061c1.493 0 2.916.546 4.017 1.522 4.149-2.663 9.73-4.339 15.887-4.455L25.235.71l.882.208.021.005 9.421 2.218A5 5 0 0 1 40.151.105a4.996 4.996 0 0 1 4.99 4.991 4.996 4.996 0 0 1-4.99 4.99 4.995 4.995 0 0 1-4.99-4.984l-8.596-2.024-3.273 9.99c5.933.231 11.291 1.912 15.291 4.517a6.028 6.028 0 0 1 4.108-1.605 6.068 6.068 0 0 1 6.061 6.061 6.019 6.019 0 0 1-3.08 5.28c.087.553.132 1.113.132 1.681-.002 8.801-10.734 15.961-23.925 15.961zM.157 27.11a9.05 9.05 0 0 0-.2 1.892c0 7.699 9.834 13.961 21.922 13.961 12.088 0 21.922-6.263 21.922-13.961 0-.612-.062-1.215-.183-1.807a1.003 1.003 0 0 1-.099-.435c-.669-2.627-2.494-5.012-5.13-6.934a.992.992 0 0 1-.429-.304c-4.007-2.755-9.732-4.482-16.081-4.482-6.285 0-11.961 1.693-15.962 4.401a1.022 1.022 0 0 1-.401.279C2.823 21.643.951 24.044.256 26.694a.992.992 0 0 1-.084.384c-.005.011-.009.022-.015.032zm40.097-8.319c2.319 1.855 4.021 4.064 4.891 6.488a4.033 4.033 0 0 0 1.605-3.239 4.065 4.065 0 0 0-4.061-4.061 4.04 4.04 0 0 0-2.435.812zm-38.965-.812a4.065 4.065 0 0 0-4.06 4.061c0 1.213.54 2.34 1.436 3.1.899-2.405 2.618-4.596 4.946-6.433a4.066 4.066 0 0 0-2.322-.728zM40.15 2.104c-1.648 0-2.99 1.342-2.99 2.991s1.342 2.99 2.99 2.99 2.99-1.341 2.99-2.99-1.341-2.991-2.99-2.991zM21.988 39.271c-4.005 0-6.827-.875-8.626-2.675a1 1 0 0 1 1.415-1.414c1.405 1.405 3.763 2.089 7.211 2.089 3.447 0 5.807-.684 7.214-2.089a.999.999 0 1 1 1.413 1.414c-1.801 1.8-4.622 2.675-8.627 2.675z" />
            <Path
              fill="#FF4500"
              d="M30.097 22.35c-2.038 0-3.749 1.707-3.749 3.745 0 2.037 1.711 3.688 3.749 3.688s3.688-1.651 3.688-3.688c0-2.038-1.651-3.745-3.688-3.745zm-16.158 0c-2.036 0-3.745 1.709-3.745 3.745s1.708 3.688 3.745 3.688 3.688-1.652 3.688-3.688-1.652-3.745-3.688-3.745z"
            />
          </Svg>
        </View>
        {/* [/Author photo w/ subscribe button] *}

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
