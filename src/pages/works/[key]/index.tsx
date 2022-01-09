import Image from "next/image";
import style from "./style.module.scss";
import works from "../../../data/works/works.json";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Component, createElement } from "react";

export default function WorkPage() {
  const router = useRouter();
  const {
    query: { key },
  } = router;
  const data = works[key as string] as typeof works[keyof typeof works];

  return (
    <div className={style.main}>
      <div className={style.imgBox}>
        <Image
          src={`/images/works/${data?.key}.jpg`}
          layout="fill"
          alt={data?.full_name}
          className={style.img}
        />
      </div>
      <h1>{data?.full_name}</h1>
      <ReactMarkdown className={style.md}>{data?.body}</ReactMarkdown>
    </div>
  );
}
