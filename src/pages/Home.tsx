import { IonSearchbar, IonToast, IonFab, IonPage, IonFabButton, IonIcon, IonContent } from '@ionic/react';
import React, {useState} from 'react';
import { add } from 'ionicons/icons';
import './Home.css';
import  Header from '../components/Header';
import  HomeView from '../components/HomeView';
import { useAppState } from '../providers/app-state';

const Home: React.FC = () => {
  const [{searchText, randList, bookmarks }, setState] = useAppState();
  const [showMobileToast, setshowMobileToast] = useState(true);

  const filteredBookmarks = bookmarks.filter (book =>
      book.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <IonPage className="post">
      <Header title={"booked home"}/>
      <IonContent>
      <IonSearchbar value={searchText} onIonChange={e => setState({ searchText: e.detail.value || '' })} showCancelButton="focus"></IonSearchbar>
      {searchText === "" && <HomeView book_arr={randList}/>}
      {searchText !== "" && <HomeView book_arr={filteredBookmarks}/>}
      <IonToast
            isOpen={showMobileToast}
            onDidDismiss={() => setshowMobileToast(false)}
            message="Currently optimized for mobile! Sorry for desktop experience!"
            duration={3000}
            position="middle"
            color="warning"
            buttons={[
              {
                text: 'X',
                handler: () => { setshowMobileToast(false)  }
              }
              ]}
      />
      </IonContent>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/bookmark/new" routerDirection="none">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default Home;