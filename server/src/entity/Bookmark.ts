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
    categoryId: number;

    @ManyToOne(() => User, (user) => user.bookmarks)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Category, (category) => category.bookmarks)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @CreateDateColumn()
    createdDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
export type BookmarkModel = Bookmark;
