import { BaseEntity } from 'typeorm';

export interface IBookmark extends BaseEntity {
    id: number;

    title: string;

    description: string;

    url: string;

    userId: number;

    folderId: number | null;

    user: IUser;

    folder: IFolder;

    createdDate: Date;

    deletedDate: Date;

    updatedDate: Date;
}
export interface IUser {
    id: number;

    email: string;

    name: string;

    count: number;

    password: string | null;

    bookmarks: IBookmark[];

    folders: IFolder[];
}

export interface IFolder {
    children: IFolder[];

    id: number;

    name: string;

    userId: number;

    parentId: number | null;

    path: string;

    depth: number;

    user: IUser;

    bookmarks: IBookmark[];

    createdDate: Date;

    deleted: boolean;

    type: 'folder';
}
