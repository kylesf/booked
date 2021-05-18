import {
  IonContent,
  IonPage,
  IonList,
  IonItemSliding,
  IonItem,
  IonIcon,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonActionSheet,
  IonButtons,
  IonButton,
  IonAlert,
  IonToast,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  ellipsisHorizontalOutline,
  chevronForwardOutline,
  trash,
  bookmarkOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import { Bookmark } from "../types/Bookmark";
import { emptyBookmark } from "../types/Bookmark";
import Header from "../components/Header";
import { useAppState } from "../providers/app-state";

const Bookmarks: React.FC = () => {
  const deletedBookmarks: Bookmark[] = [];
  const [{ bookmarks, uuid }, setState] = useAppState();

  const [selectedBookmark, setSelectedBookmark] = useState(emptyBookmark);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(deletedBookmarks);

  const saveBookmarks = async (payload: Bookmark[]) => {
    fetch("https://bookmark-api.byteword.workers.dev/api/add", {
      method: "POST",
      body: JSON.stringify({ uuid: uuid, blob: payload }),
    }).catch((err) => console.log(err));
  };

  function undoDelete() {
    const bookmarkToAdd = lastDeleted.slice(-1)[0];
    setLastDeleted(lastDeleted.filter((x) => x.id !== bookmarkToAdd.id));
    const payload = [...(bookmarks || []), bookmarkToAdd];
    saveBookmarks(payload);
  }

  function deleteBookmark(bookmark: Bookmark) {
    const payload = bookmarks.filter(
      (x: { id: string }) => x.id !== bookmark.id
    );
    setState({ bookmarks: payload });
    setLastDeleted((lastDeleted) => [...lastDeleted, bookmark]);
    saveBookmarks(payload);
    setShowDeleteToast(true);
  }

  function clickBookmark(bookmark: Bookmark) {
    setSelectedBookmark(bookmark);
  }

  return (
    <IonPage>
      <Header title={"bookmarks"} />
      <IonContent>
        <IonList>
          {bookmarks.map((bookmark: Bookmark) => {
            return (
              <IonItemSliding key={bookmark.id}>
                <IonItem>
                  <IonIcon slot="start" icon={bookmarkOutline}></IonIcon>
                  <IonLabel>{bookmark.title}</IonLabel>
                  <IonButtons slot="end">
                    <IonButton onClick={() => clickBookmark(bookmark)}>
                      <IonIcon
                        slot="icon-only"
                        icon={ellipsisHorizontalOutline}
                      ></IonIcon>
                    </IonButton>
                    <IonButton
                      routerLink={`/bookmark/${bookmark.id}`}
                      routerDirection="forward"
                    >
                      <IonIcon
                        slot="icon-only"
                        icon={chevronForwardOutline}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => deleteBookmark(bookmark)}
                  >
                    Delete
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
        </IonList>
        <IonActionSheet
          isOpen={!!selectedBookmark.id}
          header={`${selectedBookmark.title}`}
          onDidDismiss={() => setSelectedBookmark(emptyBookmark)}
          buttons={[
            {
              text: "Edit",
              icon: checkmarkCircleOutline,
              handler: () => {
                window.location.href = "/bookmark/" + selectedBookmark.id;
              },
            },
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                setShowDeleteAlert(true);
              },
            },
            {
              text: "Cancel",
              icon: "close",
              role: "cancel",
            },
          ]}
        />

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Delete this bookmark?"
          message="This operation cannot be undone."
          subHeader={`${selectedBookmark.title}`}
          buttons={[
            {
              text: "Delete",
              handler: () => {
                deleteBookmark(selectedBookmark);
              },
            },
            {
              text: "Nevermind",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              },
            },
          ]}
        />

        <IonToast
          isOpen={showDeleteToast}
          onDidDismiss={() => setShowDeleteToast(false)}
          message="Bookmark has been deleted."
          duration={2000}
          position="bottom"
          color="success"
          buttons={[
            {
              text: "Undo",
              handler: () => {
                undoDelete();
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Bookmarks;
