"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "@/app/styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // console.log(title, content);
    try {
      await axios.post(`http://localhost:3001/api/v1/posts`, {
        title: title,
        content: content,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("投稿に失敗しました。 : ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規登録</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="title">
          タイトル
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={styles.input}
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label htmlFor="content" className={styles.label}>
          本文
        </label>
        <textarea
          name="content"
          id="content"
          className={styles.textarea}
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        ></textarea>
        <button type="submit" className={styles.button}>
          投稿
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
