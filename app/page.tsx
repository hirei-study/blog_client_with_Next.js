"use client";

import { Post } from "@/types/types";
import Link from "next/link";
import styles from "@/app/styles/Home.module.css";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

type PostProps = {
  posts: Post[];
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  // console.log(posts);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/api/v1/posts`, {
        cache: "no-cache",
      });
      const posts = await res.json();
      setPosts(posts);
    };
    fetchData();
  }, []);

  const handleUpdate = async (post: Post) => {
    router.push(`/edit-post/${post.id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${id}`);

      // ページのリロードを遅延させる
      // setTimeout(() => {
      //   router.push("/");
      //   router.refresh();
      // }, 1000); // ミリ秒単位の遅延時間を設定する（例：500ミリ秒）

      window.location.reload();
    } catch (error) {
      console.log("エラーです。 : ", error);
    }
  };

  if (!posts)
    return (
      <div className="mx-auto min-h-max text-4xl font-semibold">
        投稿がありません。
      </div>
    );

  return (
    <>
      <div className={styles.homeContainer}>
        <h1 className="text-2xl font-bold mb-2">Rails and Next.js</h1>
        <Link href="/create-post" className={styles.createButton}>
          新規作成
        </Link>
        <div>
          {posts.map((post: Post) => (
            <div key={post.id} className={styles.postCard}>
              <Link href={`posts/${post.id}`} className="postCardBox">
                <h2 className="text-xl font-medium">{post.title}</h2>
              </Link>
              <p className="mb-2">{post.content}</p>
              <button
                className={styles.editButton}
                onClick={() => handleUpdate(post)}
              >
                編集
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(post.id)}
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
