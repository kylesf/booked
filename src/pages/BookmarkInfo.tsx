import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonMenuButton, IonItem, IonLabel, IonInput } from '@ionic/react';
import React from 'react';
import { Bookmark } from '../core/bookmark';
import { useBookmarks } from '../core/bookmark-hook';
import { RouteComponentProps } from 'react-router';

const emptyBookmark: Bookmark = { id: '0', title: '', url: '', info: '', tags: '', folder: '', iconuri: '' };

interface BookmarkInfoPageProps extends RouteComponentProps<{
  id: string;
}> { }

const BookmarkInfo: React.FC<BookmarkInfoPageProps> = ({ match }) => {
  console.log('BookmarkID: ', match.params);
  const bookmarkId = match.params.id;
  const [bookmarks] = useBookmarks();
  const bookmark = bookmarks.find(x => x.id === bookmarkId) || emptyBookmark;
  const pageTitle = `${bookmark.title}`

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
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput value={bookmark.title}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">URL</IonLabel>
          <IonInput value={bookmark.url}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Info</IonLabel>
          <IonInput value={bookmark.info}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Tags</IonLabel>
          <IonInput value={bookmark.tags}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Folder</IonLabel>
          <IonInput value={bookmark.folder}></IonInput>
        </IonItem>
        <IonButton onClick={() => {console.log("Saved")}} expand="block" color="secondary">Save</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default BookmarkInfo;