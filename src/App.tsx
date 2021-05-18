import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonSpinner, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Bookmarks from './pages/Bookmarks';
import BookmarkInfo from './pages/BookmarkInfo';
import Menu from './components/Menu';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/home" component={Home} exact={true} />
              <Route path="/bookmarks" component={Bookmarks} exact={true} />
              <Route path="/bookmark/new" component={BookmarkInfo} exact={true} />
              <Route path="/bookmark/:id" component={BookmarkInfo} exact={true} />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
    </IonApp>
  );
}

export default App;
