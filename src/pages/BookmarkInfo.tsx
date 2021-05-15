import { IonContent, IonButton, IonHeader, IonPage, IonToast, IonTitle, IonToolbar, IonButtons, IonBackButton, IonMenuButton, IonItem, IonLabel, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Bookmark, emptyBookmark } from '../types/Bookmark';
import { RouteComponentProps } from 'react-router';
import { useAppState } from '../providers/app-state';

interface BookmarkInfoPageProps extends RouteComponentProps<{
  id: string;
}> { }

const fields : Array<keyof Bookmark> = ["title", "subtitle", "url", "tags", "info"] 

const BookmarkInfo: React.FC<BookmarkInfoPageProps> = ({ match }) => {
  const bookmarkId = match.params.id;
  const [{bookmarks, uuid}, setState] = useAppState()
  const [editBookmark, setEditBookmark] = useState(emptyBookmark);
  const [showAddToast, setShowAddToast] = useState(false);

  const pageTitle = `${editBookmark.title}`

  const saveBookmark = () => {
    let payload: Bookmark[];
    if (editBookmark.id === "") {
      editBookmark.id = String(bookmarks.length + 1)
      payload = [...bookmarks, editBookmark]
    } else {
      const index = bookmarks.findIndex((bookmark) => bookmark.id === editBookmark.id)
      payload = [...bookmarks]
      payload[index] = editBookmark
    }
    setState({bookmarks: payload});
    fetch('https://bookmark-api.byteword.workers.dev/api/add', {
    method: "POST",
    body: JSON.stringify({uuid: uuid, blob: payload})
    })
    .then(()=>{setShowAddToast(true)}) 
    .catch(err => console.log(err));
  }

  const changeBookmark = (event: any) => {
    const bookmark = {...editBookmark, 
    [event.target.name]:event.target.value
    };
    setEditBookmark(bookmark);
  }

  useEffect(() => {
    const bookmark = bookmarks.find((x: { id: string; }) => x.id === bookmarkId) || emptyBookmark;
    setEditBookmark(bookmark)
  }, [bookmarkId])

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
                  <IonInput name={item} onIonChange={changeBookmark} value={editBookmark[item] as string}></IonInput>
                </IonItem>
              );
        })}
        <IonButton onClick={saveBookmark} expand="block" color="secondary">Save</IonButton>
        <IonToast
          isOpen={showAddToast}
          onDidDismiss={() => setShowAddToast(false)}
          message="Bookmark has been added."
          duration={1000}
          position="middle"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default BookmarkInfo;