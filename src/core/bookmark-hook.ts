import { Bookmark } from "./bookmark"
import { useState } from "react"

const mockBookmarks: Bookmark[] = [
  { id: '1', title: 'CNN', url: 'https://cnn.com', info: 'A Site for News'},
  { id: '2', title: 'Google', url: 'https://google.com', info: 'A Site for Search'},
  { id: '3', title: 'Reddit', url: 'https://reddit.com', info: 'A Site for Fun'},
  { id: '4', title: 'Fox', url: 'https://fox.com', info: 'A Site for News'},
  { id: '5', title: 'Wikipedia', url: 'https://wikipedia.com', info: 'A Site for Info'},
  { id: '6', title: 'Youtube', url: 'https://youtube.com', info: 'A Site for Videos'},
  { id: '7', title: 'Duckduckgo', url: 'https://duckduckgo.com', info: 'A Site for Search'},
  { id: '8', title: 'Apple', url: 'https://apple.com', info: 'A Site for Tech'},
  { id: '9', title: 'ABC', url: 'https://abc.com', info: 'A Site for Video'},
  { id: '10', title: 'Vimeo', url: 'https://vimeo.com', info: 'A Site for Videos'},
]

export const useBookmarks = function () {
  const useBookmarkState = useState(mockBookmarks);
  return useBookmarkState;
}