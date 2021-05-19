// import { Bookmark } from '@entity/Bookmark';
// import { User } from '@entity/User';
// import {
//     BaseEntity,
//     Column,
//     CreateDateColumn,
//     DeleteDateColumn,
//     Entity,
//     JoinColumn,
//     ManyToOne,
//     OneToMany,
//     PrimaryGeneratedColumn,
//     Unique,
// } from 'typeorm';

// @Unique(['name', 'userId'])
// @Entity()
// export class Category extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column('int')
//     userId: number;

//     @ManyToOne(() => User, (user) => user.categories)
//     @JoinColumn({ name: 'userId' })
//     user: User;

//     @OneToMany(() => Bookmark, (bookmark) => bookmark.category)
//     bookmarks: Bookmark[];

//     @CreateDateColumn()
//     createdDate: Date;

//     @DeleteDateColumn()
//     deletedDate: Date;
// }
