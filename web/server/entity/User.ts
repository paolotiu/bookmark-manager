import { Bookmark } from './Bookmark';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Folder } from './Folder';
import { IBookmark, IFolder, IUser } from './interfaces';
@Entity()
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, type: 'varchar', length: 255 })
    email: string;

    @Column()
    name: string;

    @Column({ type: 'int', default: 0 })
    count: number;

    @Column()
    password: string;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmarks: IBookmark[];

    @OneToMany(() => Folder, (folder) => folder.user)
    folders: IFolder[];
}
export type UserModel = User;
