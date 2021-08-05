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
  folderOutline
} from "ionicons/icons";
import React, { useState } from "react";
import { Bookmark, emptyBookmark, Folder } from "../types/Bookmark";
import Header from "../components/Header";
import { useAppState } from "../providers/app-state";

const Bookmarks: React.FC = () => {
  const [{rootFolder, uuid }, setState] = useAppState();
  const [selectedItem, setSelectedItem] = useState<Bookmark | Folder>(emptyBookmark);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const children = rootFolder.children

  const saveBookmarks = async (payload: Bookmark[]) => {
    fetch("https://bookmark-api.byteword.workers.dev/api/add", {
      method: "POST",
      body: JSON.stringify({ uuid: uuid, blob: payload }),
    }).catch((err) => console.log(err));
  };

  function deleteItem(item: Bookmark | Folder) {
    // const payload = item.filter(
    //   (x: { id: string }) => x.id !== item.id
    // );
    // setState({ bookmarks: payload });
    // saveBookmarks(payload);
    setShowDeleteToast(true);
  }

  function clickItem(item: Bookmark | Folder) {
    setSelectedItem(item);
  }

  return (
    <IonPage>
      <Header title={"bookmarks"} />
      <IonContent>
        <IonList>
          {children.map((item: Bookmark | Folder) => {              
              return (
              <IonItemSliding key={item.id}>
                  <IonItem>
                    {item.type === "folder" && <IonIcon slot="start" icon={folderOutline}></IonIcon>}
                    {item.type === "bookmark" && <IonIcon slot="start" icon={bookmarkOutline}></IonIcon>}
                    <IonLabel>{item.title}</IonLabel>
                    <IonButtons slot="end">
                      <IonButton onClick={() => clickItem(item as Bookmark)}>
                        <IonIcon
                          slot="icon-only"
                          icon={ellipsisHorizontalOutline}
                        ></IonIcon>
                      </IonButton>
                      {item.type === "folder" && 
                      <IonButton routerLink={`/folder/${item.id}`} routerDirection="forward">
                        <IonIcon
                          slot="icon-only"
                          icon={chevronForwardOutline}
                        ></IonIcon>
                      </IonButton>
                      }
                      {item.type === "bookmark" && 
                      <IonButton routerLink={`/bookmark/${item.id}`} routerDirection="forward">
                        <IonIcon
                          slot="icon-only"
                          icon={chevronForwardOutline}
                        ></IonIcon>
                      </IonButton>
                      }
                    </IonButtons>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => deleteItem(item as Bookmark)}
                    >
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              )
          })}
        </IonList>
        <IonActionSheet
          isOpen={!!selectedItem.id}
          header={`${selectedItem.title}`}
          onDidDismiss={() => setSelectedItem(emptyBookmark)}
          buttons={[
            {
              text: "Edit",
              icon: checkmarkCircleOutline,
              handler: () => {
                window.location.href = "/" + selectedItem.type + "/" + selectedItem.id;
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
          subHeader={`${selectedItem.title}`}
          buttons={[
            {
              text: "Delete",
              handler: () => {
                deleteItem(selectedItem);
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
              text: "X",
              handler: () => {
                setShowDeleteToast(false);
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Bookmarks;
