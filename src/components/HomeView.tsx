import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import React from "react";
import { Bookmark } from "../types/Bookmark";

const HomeView = ({ book_arr }: { book_arr: Bookmark[] }) => {
  return (
    <React.Fragment>
      {book_arr.map((bookmark: Bookmark) => {
        return (
          <IonCard
            onClick={() => {
              window.location.href = String(bookmark.url);
            }}
            key={bookmark.id}
          >
            <IonImg src={bookmark.pageImg} className="image-display" />
            <IonCardHeader>
              {/* <IonCardSubtitle>Parent Name</IonCardSubtitle> */}
              <IonCardTitle>{bookmark.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{bookmark.info}</IonCardContent>
          </IonCard>
        );
      })}
    </React.Fragment>
  );
};

export default HomeView;
