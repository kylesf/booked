import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonHeader,
    IonToolbar,
    IonTitle,
  } from '@ionic/react';
  import React from 'react';
  import { bookmarks, home, add, cloudUploadOutline, downloadOutline, logOutOutline, cogOutline, settings, } from 'ionicons/icons';
  import "./Menu.css";
 
  interface AppPage {
    title: string;
    url: string;
    icon: string;
  }

  interface AppAction{
    title: string;
    action: any;
    icon: string;
  }
  
  const appPages: AppPage[] = [
    {
      title: 'Home',
      url: '/home',
      icon: home
    },
    {
      title: 'New Bookmark',
      url: '/bookmark/new',
      icon: add
    },
    {
      title: 'Bookmarks',
      url: '/bookmarks',
      icon: bookmarks
    },
  ];
  
  function book_import() {
    console.log("import")
  };

  function book_export() {
    console.log("export")
  };
  
  function user_settings() {
    console.log("settings")
  };
  
  function logout() {
    console.log("logout")
  };


  const funcAppPages: AppAction[] = [
    {
      title: 'Import',
      action: book_import,
      icon: cloudUploadOutline
    },
    {
      title: 'Export',
      action: book_export,
      icon: downloadOutline
    },
    {
      title: 'Settings',
      action: user_settings,
      icon: cogOutline
    },
    {
      title: 'Logout',
      action: logout,
      icon: logOutOutline
    },
  ];
  
  
  const Menu: React.FC = () => {
    return (
      <IonMenu contentId="main" side="start" type="reveal">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList id="main-list">
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem routerLink={appPage.url} routerDirection="none" lines="none" >
                    <IonIcon slot="start" icon={appPage.icon} color="secondary" />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
          <IonList id="second-list">
            {funcAppPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem onClick={appPage.action} lines="none" >
                    <IonIcon slot="start" icon={appPage.icon} color="secondary" />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };
  
  export default Menu;