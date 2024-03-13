"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "@/app/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Post } from "@/types/types";

type Props = {
  post: Post;
};

const EditPost = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string | undefined>(post?.title);
  const [content, setContent] = useState<string | undefined>(post?.content);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:3001/api/v1/posts/${params.id}`
      );
      const postData = await res.json();
      setPost(postData);
      setTitle(postData.title);
      setContent(postData.content);
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // console.log(title, content);
    try {
      await axios.put(`http://localhost:3001/api/v1/posts/${params.id}`, {
        title: title,
        content: content,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("編集に失敗しました。 : ", error);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="title">
          タイトル
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={styles.input}
          value={title || ""}
          onChange={handleTitleChange}
        />
        <label htmlFor="content" className={styles.label}>
          本文
        </label>
        <textarea
          name="content"
          id="content"
          className={styles.textarea}
          value={content || ""}
          onChange={handleContentChange}
        ></textarea>
        <button type="submit" className={styles.button}>
          投稿
        </button>
      </form>
    </div>
  );
};

export default EditPost;
