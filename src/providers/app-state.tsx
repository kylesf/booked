import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Bookmark } from '../types/Bookmark';

type AppState = {
  isLoading: boolean,
  uuid?: number,
  error?: Error;
  searchText: string;
  bookmarks: Bookmark[];
  randList: Bookmark[];
}

type AppContextTypes = [AppState, React.Dispatch<React.SetStateAction<Partial<AppState>>>];

const initialState = {
  isLoading: true,
  uuid: undefined,
  error: undefined,
  searchText: '',
  bookmarks: [],
  randList: [],
};

// Context
const AppStateContext = createContext<AppContextTypes>([initialState, () => undefined]);

const stateReducer = (prevState: AppState, partialState: Partial<AppState> | ((prevState: AppState) => Partial<AppState>)) : AppState => {
  const state = typeof partialState === 'function' ? partialState(prevState) : partialState;

  return {
    ...prevState,
    ...state,
  }
}

// Provider
export function AppStateProvider( {children} : {children: React.ReactNode}) {
  const value = useReducer(stateReducer, initialState);
  const [state, setState] = value;

  useEffect(() => {
    fetch('https://bookmark-api.byteword.workers.dev/api/get')
      .then(response => response.json())
      .then(response => {
        const nextState = {
          isLoading: false,
          uuid: response.uuid,
          bookmarks: response.blob,
          randList: [] as Bookmark[],
        };
        
        // Fix collision issue
        for (let i = 0; i <= Math.min(nextState.bookmarks.length || 0, 6); i++) {
          // const random_index = Math.floor(Math.random() * nextState.bookmarks.length);
          const random_index = i;
          nextState.randList.push(nextState.bookmarks[random_index])
        }

        setState(nextState);
      })
      .catch(error => setState({ isLoading: false, error }));
  }, []);
  
  if (state.isLoading) {
    return null
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