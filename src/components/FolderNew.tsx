import {
    IonPage,
    IonHeader,
    IonBackButton,
    IonToolbar,
    IonMenuButton,
    IonButton,
    IonTitle,
    IonContent,
    IonButtons,
    IonToast,
    IonItem,
    IonSelectOption,
    IonSelect,
    IonLabel,
    IonInput
  } from "@ionic/react";
  import React, {useState, useEffect} from "react";
  import { useAppState } from "../providers/app-state";
  import { RouteComponentProps } from "react-router";
  import { Folder, emptyFolder } from "../types/Bookmark";
  
  interface FolderInfoPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

  const FolderNew: React.FC<FolderInfoPageProps> = ({ match }) => {
    const folderId = match.params.id;
    const [showAddToast, setShowAddToast] = useState(false);
    const [{ folderList, uuid }, setState] = useAppState();
    const [editFolder, setEditFolder] = useState(emptyFolder);

    function uploadBlob() {
        console.log("Upload")
        console.log(uuid)
        setShowAddToast(true)
    }

    function addFolder() {
        let payload: Folder[];
        const now = new Date();

        if (editFolder.id === "") {
            editFolder.id = String(folderList.length + 1);
            payload = [...folderList, editFolder];
        } else {
            const index = folderList.findIndex(
            (folderList) => folderList.id === editFolder.id
            );
            editFolder.lastModified = now.getDate();
            payload = [...folderList];
            payload[index] = editFolder;
        }
        setState({ folderList: payload });
        console.log(folderList)
        
        uploadBlob()
    }

    const changeFolder = (event: any) => {
        const folder = {
          ...editFolder,
          [event.target.name]: event.target.value,
        };
        setEditFolder(folder);
    };
    
    useEffect(() => {
    const folder =
        folderList.find((x: { id: string }) => x.id === folderId) ||
        emptyFolder;
        setEditFolder(folder);
    }, [folderId, folderList]);
    


    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Create New Folder</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem>
                <IonLabel position="stacked">Folder Name</IonLabel>
                    <IonInput
                    name="title"
                    onIonChange={changeFolder}
                    value={editFolder["title"] as string}
                    ></IonInput>
            </IonItem>
            <IonItem>
                <IonSelect name="parent_folder" onChange={changeFolder} placeholder="Select Folder Location">
                    {folderList.map((item) => { return (<IonSelectOption key={item.title} >{item.title}</IonSelectOption>)})}
                </IonSelect>
            </IonItem> 
          <IonButton onClick={addFolder}  expand="block" color="secondary">
            Save
          </IonButton>
          <IonToast
            isOpen={showAddToast}
            onDidDismiss={() => setShowAddToast(false)}
            message="Folder has been added"
            duration={1000}
            position="bottom"
            color="success"
          />
        </IonContent>
      </IonPage>
    );
  };
  
  export default FolderNew;
  