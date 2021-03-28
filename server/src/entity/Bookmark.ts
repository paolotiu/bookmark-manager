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
import { BookmarkToCategory } from './BookmarkToCategory';
import { User } from './User';

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

    @CreateDateColumn()
    createdDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.bookmarks)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => BookmarkToCategory, (btc) => btc.bookmarkId)
    categoryConnection: Promise<BookmarkToCategory[]>;
}
export type BookmarkModel = Bookmark;
