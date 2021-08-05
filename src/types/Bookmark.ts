export interface Bookmark {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  info?: string;
  dateAdded: number;
  lastModified: number;
  pageImg?: string;
  url: string;
  tags?: Array<string>;
  folder: Folder,
}

export interface Folder {
  id: string;
  type: string;
  title: string;
  dateAdded: number;
  lastModified: number;
  children: Array<Bookmark | Folder>;
}

export const emptyFolder: Folder = {
  id: "",
  type: "folder",
  title: "",
  dateAdded: 0,
  lastModified: 0,
  children: [],
}

export const emptyBookmark: Bookmark = {
  id: "",
  type: "bookmark",
  title: "",
  subtitle: "",
  info: "",
  dateAdded: 0,
  lastModified: 0,
  pageImg: "",
  url: "",
  tags: [],
  folder: emptyFolder,
};