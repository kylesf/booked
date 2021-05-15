import { IonCol, IonRow, IonImg, IonGrid, IonSearchbar, IonFab, IonPage, IonFabButton, IonIcon, IonContent, IonSpinner } from '@ionic/react';
import React from 'react';
import { add } from 'ionicons/icons';
import './Home.css';
import  Header from '../components/Header';
import  HomeView from '../components/HomeView';
import { useAppState } from '../providers/app-state';

const Home: React.FC = () => {
  const [{searchText, randList, }, setState] = useAppState();

  return (
    <IonPage className="post">
      <Header title={"booked home"}/>
      <IonContent>
      <IonSearchbar value={searchText} onIonChange={e => setState({ searchText: e.detail.value || '' })} showCancelButton="focus"></IonSearchbar>
      {searchText === "" && <HomeView book_arr={randList}/>}
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