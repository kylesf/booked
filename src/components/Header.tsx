import { 
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonButtons, 
    IonTitle
    } from '@ionic/react';
import React from 'react';
  
  const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          <IonTitle slot="start" >{title}</IonTitle>
          <IonTitle slot="end" >booked</IonTitle>
          </IonToolbar>
        </IonHeader>
  
    );
  }
  
  export default Header;