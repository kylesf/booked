import {
  IonContent,
  IonButton,
  IonHeader,
  IonPage,
  IonToast,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Bookmark, emptyBookmark } from "../types/Bookmark";
import { RouteComponentProps } from "react-router";
import { useAppState } from "../providers/app-state";

interface BookmarkInfoPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const fields: Array<keyof Bookmark> = [
  "title",
  "subtitle",
  "url",
  "tags",
  "info",
];

const BookmarkInfo: React.FC<BookmarkInfoPageProps> = ({ match }) => {
  const bookmarkId = match.params.id;
  const [{ bookmarks, uuid }, setState] = useAppState();
  const [editBookmark, setEditBookmark] = useState(emptyBookmark);
  const [showAddToast, setShowAddToast] = useState(false);

  const pageTitle = `${editBookmark.title}`;

  type PageInfo = {
    title: string;
    description: string;
    image_url: string;
  };

  // Determine how to run only as needed?
  const getInfo = async (url: string) => {
    let pageData = await fetch(
      "https://api.linkpreview.net/?key=d9be283151b00a10bd475e863d978e61&q=" +
        url
    );
    let pageDataJson = await pageData.json();
    const bookPageInfo: PageInfo = {
      title: pageDataJson.title,
      description: pageDataJson.description,
      image_url: pageDataJson.image,
    };
    return bookPageInfo;
  };
  const saveBookmarks = async () => {
    let payload: Bookmark[];

    if (editBookmark.url !== "") {
      console.log("Get Info");
      let bookPageInfo = await getInfo(editBookmark.url);
      console.log(bookPageInfo);
      if (bookPageInfo !== undefined) {
        editBookmark.title = bookPageInfo.title;
        editBookmark.info = bookPageInfo.description;
        editBookmark.pageImg = bookPageInfo.image_url;
        console.log(bookPageInfo.image_url);
      }
    } else {
      console.log("Error");
    }

    if (editBookmark.id === "") {
      editBookmark.id = String(bookmarks.length + 1);
      payload = [...bookmarks, editBookmark];
    } else {
      const index = bookmarks.findIndex(
        (bookmark) => bookmark.id === editBookmark.id
      );
      payload = [...bookmarks];
      payload[index] = editBookmark;
    }
    setState({ bookmarks: payload });
    fetch("https://bookmark-api.byteword.workers.dev/api/add", {
      method: "POST",
      body: JSON.stringify({ uuid: uuid, blob: payload }),
    })
      .then(() => {
        console.log(payload);
        setShowAddToast(true);
      })
      .catch((err) => console.log(err));
  };

  const changeBookmark = (event: any) => {
    const bookmark = {
      ...editBookmark,
      [event.target.name]: event.target.value,
    };
    setEditBookmark(bookmark);
  };

  useEffect(() => {
    const bookmark =
      bookmarks.find((x: { id: string }) => x.id === bookmarkId) ||
      emptyBookmark;
    setEditBookmark(bookmark);
  }, [bookmarkId, bookmarks]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {fields.map((item) => {
          return (
            <IonItem key={item}>
              <IonLabel position="stacked">{item}</IonLabel>
              <IonInput
                name={item}
                onIonChange={changeBookmark}
                value={editBookmark[item] as string}
              ></IonInput>
            </IonItem>
          );
        })}
        <IonButton onClick={saveBookmarks} expand="block" color="secondary">
          Save
        </IonButton>
        <IonToast
          isOpen={showAddToast}
          onDidDismiss={() => setShowAddToast(false)}
          message="Bookmark has been added."
          duration={1000}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default BookmarkInfo;
