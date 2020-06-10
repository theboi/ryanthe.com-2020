import React, { useEffect, useRef, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import style from "./style.module.css";
import K from "../../constants";
import Post from "../../models/post";

let titleField: string;
let bodyField: string;
let fileField: File[];

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState(true);
  const message = "I see you have found me.".split("");

  let messageRef = useRef(null);
  let counter = 0;

  useEffect(() => {
    if (!signedIn) {
      if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);

      messageRef.current.innerHTML = "";

      var typer = setInterval(() => {
        if (counter < message.length) {
          messageRef.current.innerHTML =
            messageRef.current.innerHTML + message[counter];
          counter++;
        }
      }, 50);
    }
  });

  return (
    <>
      <div className={style.main}>
        {signedIn ? (
          <>
            <div className={style.admin}>
              <input placeholder="Title" type="text" className={style.bodyField} onChange={event => titleField = event.target.value}/>
              <textarea placeholder="Body" name="Content" id="content" cols={30} rows={10} className={style.bodyField} onChange={event => bodyField = event.target.value} />
              <div className={style.genre}>
                <input type="checkbox" id="code"/>
                <label htmlFor="code">Code</label>

                <input type="checkbox" id="design"/>
                <label htmlFor="design">Design</label>

                <input type="checkbox" id="robot"/>
                <label htmlFor="robot">Robot</label>
              </div>
              <input type="file" id="file" multiple onChange={event => fileField = Array.from(event.target.files)}/>
              <button onClick={() => {
                if (!titleField || !bodyField) {
                  alert("Fill in the fields")
                  return
                }
                Post.addNew({
                  title: titleField ?? "ERROR",
                  body: bodyField ?? "ERROR",
                  genre: Post.Genre.Code,
                  media: fileField,
                })
              }}>Post</button>
            </div>
          </>
        ) : (
          <>
            <h1 className={style.header}>
              Greetings, fellow hum
              <span
                onDoubleClick={() => {
                  firebase
                    .auth()
                    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                    .then((result) => {
                      console.log("Successfully signed in");
                      if (result.user.email === "ryan.the.2006@gmail.com") {
                        setSignedIn(true);
                      } else {
                        firebase.auth().signOut();
                        setSignedIn(false);
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                a
              </span>
              n
            </h1>
            <p ref={messageRef}>{""}</p>
          </>
        )}
      </div>
    </>
  );
}
