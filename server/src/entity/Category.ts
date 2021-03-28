import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookmarkToCategory } from './BookmarkToCategory';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => BookmarkToCategory, (btc) => btc.category)
    bookConnection: Promise<BookmarkToCategory[]>;
}
export type CategoryModel = Category;
