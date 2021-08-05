import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Bookmark, Folder, emptyFolder } from "../types/Bookmark";

type AppState = {
  isLoading: boolean;
  uuid: string;
  rootFolder: Folder;
  error?: Error;
  searchText: string;
  bookmarks: Bookmark[];
  randList: Bookmark[];
  folderList: Folder[];
};

type AppContextTypes = [
  AppState,
  React.Dispatch<React.SetStateAction<Partial<AppState>>>
];

const initialState = {
  isLoading: true,
  uuid: "",
  rootFolder: emptyFolder,
  error: undefined,
  searchText: "",
  bookmarks: [],
  randList: [],
  folderList: [],
};

// Context
const AppStateContext = createContext<AppContextTypes>([
  initialState,
  () => undefined,
]);

const stateReducer = (
  prevState: AppState,
  partialState: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)
): AppState => {
  const state =
    typeof partialState === "function" ? partialState(prevState) : partialState;

  return {
    ...prevState,
    ...state,
  };
};

// Provider
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const value = useReducer(stateReducer, initialState);
  const [state, setState] = value;

  useEffect(() => {
    fetch("https://bookmark-api.byteword.workers.dev/api/get")
      .then((response) => response.json())
      .then((response) => {
        const nextState = {
          isLoading: false,
          uuid: response.uuid,
          rootFolder: response.blob[0],
          bookmarks: [] as Bookmark[],
          folderList: [] as Folder[],
          randList: [] as Bookmark[],
        };

        // // Traverse Root Folder to Populate Bookmarks and Folders
        // for (const [key, value, path, parent] of traverse(nextState.rootFolder)) {
        //   // do something here with each key and value
        //   console.log(key, value, path, parent);
        //   if (key === 'folder') {
        //     nextState.folderList.push(parent)
        //   } else {
        //     nextState.bookmarks.push(parent)
        //   }
        // }

        const FolderA: Folder = {
          id: "99",
          type: "folder",
          title: "Top Level",
          dateAdded: 0,
          lastModified: 0,
          children: [],
        }

        const FolderB: Folder = {
          id: "99",
          type: "folder",
          title: "Tech",
          dateAdded: 0,
          lastModified: 0,
          children: [],
        }

        const FolderC: Folder = {
          id: "99",
          type: "folder",
          title: "News",
          dateAdded: 0,
          lastModified: 0,
          children: [],
        }

        nextState.folderList.push(FolderA);
        nextState.folderList.push(FolderB);
        nextState.folderList.push(FolderC);


         // Temp override. Delete
        nextState.bookmarks = nextState.rootFolder.children;
        // Fix collision issue
        for (
          let i = 1;
          i <= Math.min(nextState.bookmarks.length || 0, 6);
          i++
        ) {
          // const random_index = Math.floor(Math.random() * nextState.bookmarks.length);
          const random_index = i;
          nextState.randList.push(nextState.bookmarks[random_index]);
        }

        setState(nextState);
      })
      .catch((error) => setState({ isLoading: false, error }));
  }, [setState]);

  if (state.isLoading) {
    return null;
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "You probably forgot the <AppStateProvider> context provider!"
    );
  }
  return context;
}
