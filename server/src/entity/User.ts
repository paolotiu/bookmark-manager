import { Bookmark } from './Bookmark';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Category } from './Category';

@Entity()
export class User extends BaseEntity {
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
    bookmarks: Bookmark[];

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[];
}
export type UserModel = User;
