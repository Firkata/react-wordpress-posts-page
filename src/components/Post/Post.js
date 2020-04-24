import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";

const Post = (props) => {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://www.angrybirds.com/wp-json/wp/v2/posts/${props.match.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      });
  }, [props.match.params.id]);

  return (
    <>
      {isLoading && <div className={styles.Loading}>Loading...</div>}
      {!isLoading && (
        <div className={styles.Container}>
          <div className={styles.Card}>
            <h1>{post.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
