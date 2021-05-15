import { 
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle, 
    IonCardSubtitle,
    IonCardContent
    } from '@ionic/react';
import React from 'react';
import { Bookmark } from '../types/Bookmark';

  
const HomeView = ({ book_arr } : { book_arr: Bookmark[] }) => {
    return (
        <React.Fragment>
            {book_arr.map((bookmark: Bookmark) => {
                return (
                <IonCard key={bookmark.id}>
                    <IonImg src="assets/rust.jpg" className="image-display"/>
                    <IonCardHeader>
                    <IonCardSubtitle>Check this out</IonCardSubtitle>
                    <IonCardTitle>{bookmark.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    {bookmark.info}
                    </IonCardContent>
                </IonCard>
                );
            })}
        </React.Fragment>
    );
}
  
export default HomeView;