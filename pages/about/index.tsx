import React from "react";
import style from "./style.module.css";

export default function AboutPage() {
  const socialLinks = [
    { icon: "github", color: "#333", link: "https://github.com/theboi" },
    {
      icon: "linkedin",
      color: "#0077b5",
      link: "https://www.linkedin.com/in/ryan-the/",
    },
    {
      icon: "instagram",
      color:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
      link: "https://www.instagram.com/theboi_io/",
    },
    {
      icon: "twitter",
      color: "#1da1f2",
      link: "https://twitter.com/theboi_io",
    },
  ];

  return (
    <>
      <div className={style.main}>
        <img className={style.me} src="/images/me.jpg" alt="Me" useMap="#me"/>
        <map name="me">
          <area
            shape="rect"
            coords="100,5,180,65"
            alt="Crowned"
            media="screen and (hover: hover)"
            href="https://ryanthe.com"
            // onClick={() => console.log("yeet")}
            target="_blank"
            className={style.meMap}
          />
        </map>
        <div className={style.intro}>
          <h1 className={style.hey}>Hey,</h1>
          <p>
            I'm Ryan — a <span>student</span> software <span>developer</span>{" "}
            and <span>designer</span> based in Singapore. Coding since 2018.
          </p>
          <div className={style.social}>
            {socialLinks.map((value) => {
              return (
                <a
                  className={style.socialButtons}
                  style={{ background: value.color }}
                  href={value.link}
                  target="_blank"
                >
                  <i className={`fab fa-${value.icon}`}></i>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
