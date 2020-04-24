import React, { useEffect, useState } from "react";
import styles from "./PostItem.module.css";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const [image, setImage] = useState();
  const [postAuthor, setPostAuthor] = useState();

  const { id, title, excerpt, featured_media, author } = post;

  useEffect(() => {
    const getImageUrl = fetch(
      `https://www.angrybirds.com/wp-json/wp/v2/media/${featured_media}`
    );
    const getAuthor = fetch(
      `https://www.angrybirds.com/wp-json/wp/v2/users/${author}`
    );

    Promise.all([getImageUrl, getAuthor]).then((res) => {
      res[0].json().then((data) => {
        setImage(data.media_details.sizes.full.source_url);
      });
      res[1].json().then((data) => setPostAuthor(data.name));
    });
  }, [featured_media, author]);

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <Link
          to={`/post/${id}`}
          className={styles.Link}
          style={{ color: "#000" }}
        >
          <div className={styles.WrapperContainer}>
            <div className={styles.ImageWrapper}>
              <img className={styles.Image} src={image} alt={title.rendered} />
            </div>
          </div>
          <div className={styles.Body}>
            <h2 className={styles.Title}>{title.rendered}</h2>
            <div
              className={styles.Content}
              dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
            />
            <small className={styles.Author}>
              Posted by <strong>{postAuthor}</strong>
            </small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
