import React, { useEffect, useState } from "react";
import PostItem from "../PostItem";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [postsData, setPostsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(2);
  // const [postIds, setPostIds] = useState([]); Todo: tracking next post

  useEffect(() => {
    async function fetchData() {
      await fetch("https://www.angrybirds.com/wp-json/wp/v2/posts")
        .then((res) => res.json())
        .then((data) => {
          setPostsData(data);
          setIsLoading(false);
        });
    }
    fetchData();
  }, []);

  // if (postsData) {
  //   postsData.forEach((post) => {
  //     setPostIds(post.id);
  //   });
  // }

  return (
    <>
      {isLoading && <div className={styles.Loading}>Loading...</div>}
      {!isLoading &&
        postsData.slice(0, visible).map((post, index) => (
          <PostItem
            key={post.id}
            post={post}
            // nextPost={index < postIds.length ? postIds[index + 1] : ""}
          />
        ))}
      {!isLoading && visible < postsData.length && (
        <div className={styles.BtnContainer}>
          <button
            className={styles.Button}
            onClick={() => setVisible((c) => c + 2)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
