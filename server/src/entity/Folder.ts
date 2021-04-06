import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { User } from '@entity/User';
import { Bookmark } from '@entity/Bookmark';

@Unique(['name', 'userId', 'depth'])
@Entity()
export class Folder extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'int', default: 0 })
    depth: number;

    @Column({ type: 'int', nullable: true })
    parentId: number;

    @Column('int')
    userId: number;

    @ManyToOne(() => Folder, (folder) => folder.parentId)
    @JoinColumn({ name: 'parentId' })
    parent: Folder;

    @ManyToOne(() => User, (user) => user.folders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.folder)
    bookmarks: Bookmark[];

    @CreateDateColumn()
    createdDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
