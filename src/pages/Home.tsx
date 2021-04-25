import { IonCol, IonRow, IonImg, IonGrid, IonSearchbar, IonFab, IonPage, IonFabButton, IonIcon, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonCard, IonContent } from '@ionic/react';
import React, {useState} from 'react';
import { add } from 'ionicons/icons';
import './Home.css';
import  Header from '../components/Header';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage className="post">
      <Header title={"~ home ~"}/>
      <IonContent>
      <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus"></IonSearchbar>
        <IonCard>
              <IonImg src="assets/rust.jpg" className="image-display"/>
              <IonCardHeader>
                <IonCardSubtitle>Rust</IonCardSubtitle>
                <IonCardTitle>Rust Tutorial</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Learn how to write Rust today!
              </IonCardContent>
        </IonCard>
      </IonContent>
        {/* New Bookmark Fab */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/bookmark/new" routerDirection="none">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default Home;



