export interface Bookmark {
    id: string;
    title?: string;
    subtitle?: string;
    info?: string;
    dateAdded?: number,
    lastModified?: number,
    pageImg?: string,
    url?: string;
    tags?: Array<string>;
    children?: Array<Bookmark>;
}

// eslint

// Best place for this??
export const emptyBookmark: Bookmark = { 
    id: '', 
    title: '', 
    subtitle: '', 
    info: '', 
    dateAdded: 0, 
    lastModified: 0, 
    pageImg: '', 
    url: '', 
    tags: [], 
    children: []
}
