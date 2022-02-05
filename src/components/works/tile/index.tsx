import Link from "next/link";
import Image from "next/image";

import style from "./style.module.scss";

export default function HomeTile({
  data,
}) {
  // https://stackoverflow.com/questions/53662208/types-from-both-keys-and-values-of-object-in-typescript
  return (
    <div
      className={style.tile}
      style={{
        gridColumn: `span ${data.notability === "High" ? 2 : 1}`,
      }}
    >
      <Link href={`/works/${data.id}`}>
        <a
          className={style.desc}
        >
          <h1>{data.name}</h1>
          <p>{data.discipline}</p>
          {/* <Image
            src={}
            layout="fill"
            alt={data.properties.full_name}
            className={style.img}
          /> */}
          {/* <div className={style.overlay}>
            <div>
              
            </div>
          </div> */}
        </a>
      </Link>
      {data.media[0]?.file.url && <Image src={data.media[0]?.file.url} alt="hi" layout="fill" className={style.img}/>}
    </div>
  );
}
