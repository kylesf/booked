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
} from "@ionic/react";
import React from "react";
import {
  bookmarks,
  home,
  add,
  cloudUploadOutline,
  downloadOutline,
  logOutOutline,
} from "ionicons/icons";
import "./Menu.css";
import { useAppState } from "../providers/app-state";

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

interface AppAction {
  title: string;
  action: any;
  icon: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    icon: home,
  },
  {
    title: "New Bookmark",
    url: "/bookmark/new",
    icon: add,
  },
  {
    title: "New Folder",
    url: "/folder/new",
    icon: add,
  },
  {
    title: "Bookmarks",
    url: "/bookmarks",
    icon: bookmarks,
  },
];

const Menu: React.FC = () => {
  const [{ bookmarks }] = useAppState();

  function json_process(file: JSON) {
    console.log(file);
  }

  function book_import() {
    document.getElementById("file-input")!.click();
    const fileSelector: any = document.getElementById("file-input");
    fileSelector.addEventListener("change", (event: any) => {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onload = function () {
        const result: any = reader.result;
        let parsedJSON = JSON.parse(result);
        json_process(parsedJSON);
      };
      reader.readAsText(file);
    });
  }

  function book_export() {
    // Temp
    // Credit: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(bookmarks));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "booked.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function logout() {
    console.log("logout");
  }

  const funcAppPages: AppAction[] = [
    {
      title: "Import",
      action: book_import,
      icon: cloudUploadOutline,
    },
    {
      title: "Export",
      action: book_export,
      icon: downloadOutline,
    },
    // {
    //   title: 'Settings',
    //   action: user_settings,
    //   icon: cogOutline
    // },
    {
      title: "Logout",
      action: logout,
      icon: logOutOutline,
    },
  ];

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
                <IonItem
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                >
                  <IonIcon slot="start" icon={appPage.icon} color="secondary" />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <input id="file-input" type="file" name="name" accept=".json" />
        <IonList id="second-list">
          {funcAppPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem button onClick={appPage.action} lines="none">
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
