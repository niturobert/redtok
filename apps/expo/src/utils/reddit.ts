export async function getRedditFrontPagePosts(subreddit = "popular") {
  return await fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((res) => res.json())
    .then((data) => {
      return data.data.children.map((post: any) => {
        return {
          id: post.data.id,
          title: post.data.title,
          url: post.data.url,
          thumbnail: post.data.thumbnail,
          subreddit: post.data.subreddit,
          author: post.data.author,
          body: post.data.text ?? post.data.selftext ?? post.data.body,
          total_awards_received: post.data.total_awards_received,
          score: post.data.score,
          ups: post.data.ups,
          num_comments: post.data.num_comments,
          created_at: new Date(post.data.created_utc * 1000),
        };
      });
    });
}

export async function loadMorePosts(subreddit = "popular", after = "") {
  return await fetch(
    `https://www.reddit.com/r/${subreddit}.json?after=${after}?limit=10`
  )
    .then((res) => res.json())
    .then((data) => {
      return data.data.children.map((post: any) => {
        return {
          id: post.data.id,
          title: post.data.title,
          url: post.data.url,
          thumbnail: post.data.thumbnail,
          subreddit: post.data.subreddit,
          author: post.data.author,
          body: post.data.text ?? post.data.selftext ?? post.data.body,
          total_awards_received: post.data.total_awards_received,
          score: post.data.score,
          ups: post.data.ups,
          num_comments: post.data.num_comments,
          created_at: new Date(post.data.created_utc * 1000),
        };
      });
    });
}
