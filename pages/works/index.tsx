import React, { useEffect, useState } from "react";
import Link from "next/link";

import Post from "../../models/post";
import style from "./style.module.css";
import PostCard from "../../components/cards/post";

export default function WorkPage(props) {

  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    Post.getAll().then((res) => {
      const data = Array.from(res, (value) => {
        return value.data();
      });
      console.log(data)
      if (!currentPosts.length) setCurrentPosts(data);
    });
  });

  return (
    <>
      <div className={style.main}>
        <div className={style.filter}>
          <ul>
            <li>All.</li>
            <li>Code.</li>
            <li>Design.</li>
            <li>Robot.</li>
            <li>Others.</li>
          </ul>
        </div>
        <div className={`${style.content} ${style.grid}`}>
          {(!currentPosts.length ? [...Array(12)] : currentPosts).map(
            (value, index) => (
              <PostCard key={index} value={value} currentPosts={currentPosts} />
            )
          )}
        </div>
      </div>
    </>
  );
}
