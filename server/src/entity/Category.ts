import { User } from '@entity/User';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BookmarkToCategory } from './BookmarkToCategory';

@Unique(['name', 'userId'])
@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => BookmarkToCategory, (btc) => btc.category)
    bookConnection: Promise<BookmarkToCategory[]>;

    @Column('int')
    userId: number;

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: 'userId' })
    user: User;
}
export type CategoryModel = Category;
