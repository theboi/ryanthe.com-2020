import Link from "next/link";

import style from "./style.module.scss";
import ThemeBadge from "../../theme/badge";
import {
  WorksDiscipline,
  WorksNotability,
  WorksProperties,
} from "../../../data/works";
import clsx from "clsx";

export default function HomeTile({
  entryProps,
}: {
  entryProps: WorksProperties;
}) {
  return (
    <div
      className={clsx(style.tile, entryProps?.coverImageURL && style.imgLoaded)}
      style={{
        gridColumn: `span ${
          entryProps.notability === WorksNotability.High ? 2 : 1
        }`,
      }}
    >
      <Link
        className={style.desc}
        passHref
        href={entryProps.url || `/works/${entryProps.id}`}
      >
        <h1>{entryProps.name}</h1>
        <h3>{entryProps.recognition}</h3>
        <p className={style.badges}>
          {entryProps.discipline.map((e, i) => (
            <ThemeBadge key={i} discipline={e}>
              {WorksDiscipline[e]}
            </ThemeBadge>
          ))}
        </p>
        <p className={style.expandable}>{entryProps.description}</p>
        {/* <Image
            src={}
            layout="fill"
            alt={entryProps.properties.full_name}
            className={style.img}
          /> */}
        {/* <div className={style.overlay}>
            <div>
              
            </div>
          </div> */}
      </Link>
      {entryProps?.coverImageURL && (
        // NextJS requires usage of Image from 'next/image' instead of img but Notion image URLs are not permanent and hence will fail to work
        // TODO: revert the above since issue was found to be with using SSG instead of SSR
        // eslint-disable-next-line
        <img
          src={entryProps.coverImageURL}
          alt={entryProps.name}
          className={style.img}
        />
      )}
    </div>
  );
}
