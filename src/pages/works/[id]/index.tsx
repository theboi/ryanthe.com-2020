import style from "./style.module.scss";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { databaseId } from "..";

export default function WorkPage({ data }) {
  return (
    <div className={style.main}>
      <h1>{data?.time}</h1>
      <h1>{data?.ccaRecord ? "Yes" : "No"}</h1>
      <p>{data?.pageContent.length}</p>
      <div className={style.imgBox}>
        <Image
          src={`/images/works/${data?.key}.jpg`}
          layout="fill"
          alt={data?.full_name}
          className={style.img}
        />
      </div>
      <h1>{data?.full_name}</h1>
      {data?.pageContent.map((e) => resolveBlock(e))}
    </div>
  );
}

const resolveBlock = (block) => {

}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params["id"] as string

  const { Client } = require("@notionhq/client");

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const entriesWithKey = (
    await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "ID",
        rich_text: {
          equals: id,
        },
      },
    })
  );
  if (entriesWithKey.results.length === 0) return { notFound: true }
  const entryWithKey = entriesWithKey.results[0]

  let start = true
  let cursor = undefined
  const blocks = []

  while (cursor != undefined || start === true) {
    const blockWithKey = await notion.blocks.children.list({
      block_id: entryWithKey.id,
      start_cursor: cursor,
      // page_size: 5, // for testing TODO: testing
    });
    blocks.push(...blockWithKey.results)
    cursor = blockWithKey["next_cursor"]
    if (start == true) start = false
  }

  const data = {
    time: entryWithKey["last_edited_time"],
    name: entryWithKey.properties["Name"].title.map((e) => e.plain_text).join(),
    fullName: entryWithKey.properties["Full Name"].rich_text.map((e) => e.plain_text).join(),
    ccaRecord: entryWithKey.properties["CCA Record"].checkbox,
    pageContent: blocks,
    // writeUp
    // recognition
  };

  // 'CCA Record': { id: '%3Bu%60a', type: 'checkbox', checkbox: false },
  //   'Write-up': { id: '%3Con%5B', type: 'rich_text', rich_text: [] },
  //   Recognition: { id: '%3C%7DGl', type: 'rich_text', rich_text: [Array] },
  //   URL: { id: 'JpWR', type: 'url', url: null },
  //   'Full Name': { id: 'XKQA', type: 'rich_text', rich_text: [Array] },
  //   Media: { id: 'jl%3FA', type: 'files', files: [Array] },
  //   Date: { id: 'nSX%3F', type: 'date', date: null },
  //   Notability: { id: 'qacy', type: 'select', select: [Object] },
  //   New: { id: 't%5E%7B%3D', type: 'checkbox', checkbox: true },
  //   Key: { id: 'yhBt', type: 'rich_text', rich_text: [Array] },
  //   Discipline: { id: '%7DRzq', type: 'multi_select', multi_select: [Array] },
  //   Name: { id: 'title', type: 'title', title: [Array] }

  return {
    props: { data },
  };
}