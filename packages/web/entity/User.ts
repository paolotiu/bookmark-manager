import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from './Bookmark';
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

    @Column('int', { array: true, default: [] })
    rootOrder: number[];

    // We have to specify the types here to not cause a typeorm issue
    // https://stackoverflow.com/a/64644807/14242400
    @Column('text', { nullable: true, default: null })
    resetPasswordToken?: string | null;

    @Column('date', { nullable: true, default: null })
    resetPasswordExpiry?: Date | null;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmarks: IBookmark[];

    @OneToMany(() => Folder, (folder) => folder.user)
    folders: IFolder[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
export type UserModel = User;
