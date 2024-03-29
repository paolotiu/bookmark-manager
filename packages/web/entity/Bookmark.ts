import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Folder } from './Folder';
import { IBookmark, IFolder, IUser } from './interfaces';

@Entity()
export class Bookmark extends BaseEntity implements IBookmark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    url: string;

    @Column('int')
    userId: number;

    @Column({ type: 'int', nullable: true })
    folderId: number | null;

    @ManyToOne('User', 'bookmarks')
    @JoinColumn({ name: 'userId' })
    user: IUser;

    @ManyToOne(() => Folder, (folder) => folder.bookmarks)
    @JoinColumn({ name: 'folderId' })
    folder: IFolder;

    @CreateDateColumn()
    createdDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
export type BookmarkModel = Bookmark;
