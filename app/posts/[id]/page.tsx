import { Post } from "@/types/types";
import React from "react";
import styles from "@/app/styles/Post.module.css";

type PostProps = {
  post: Post;
};

const Post = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${process.env.API_URL}/${params.id}`, {
    cache: "no-cache",
  });
  const post = await res.json();
  console.log(post);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.date}>{post.created_at}</div>
      <p className={styles.content}>{post.content}</p>
    </div>
  );
};

export default Post;
