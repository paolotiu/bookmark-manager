import { Category } from './Category';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Folder } from './Folder';

@Entity()
export class Bookmark extends BaseEntity {
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
    categoryId: number | null;

    @Column({ type: 'int', nullable: true })
    folderId: number | null;

    @ManyToOne(() => User, (user) => user.bookmarks)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Category, (category) => category.bookmarks)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @ManyToOne(() => Folder, (folder) => folder.bookmarks)
    @JoinColumn({ name: 'folderId' })
    folder: Folder;

    @CreateDateColumn()
    createdDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
export type BookmarkModel = Bookmark;
