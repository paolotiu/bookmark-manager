import {
    BaseEntity,
    Column,
    CreateDateColumn,
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
    children: Folder[];

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @Column({ type: 'int', nullable: true })
    // parentId: number;

    @Column('int')
    userId: number;

    @Column('ltree', { nullable: true })
    path: string;

    // @TreeParent()
    // parent: Folder;

    // @TreeChildren({ cascade: true })
    // children: Folder[];

    @Column('int', { default: 0 })
    depth: number;

    @ManyToOne(() => User, (user) => user.folders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Bookmark, (bookmark) => bookmark.folder)
    bookmarks: Bookmark[];

    @CreateDateColumn()
    createdDate: Date;

    @Column('boolean', { default: false })
    deleted: boolean;

    private arrayToTree(arr: Folder[]): Folder {
        const map: Record<string, Folder> = {};
        for (let i = 0; i < arr.length; i++) {
            map[arr[i].id] = arr[i];
            arr[i].children = [];
        }
        arr.forEach((folder, i) => {
            const regex = /\w+\./g;
            const regexMatches = [...folder.path.matchAll(regex)];

            // Skip root node
            if (i) {
                // Gets the parent id form the path
                // 1.2.3 => 2
                const parentId = regexMatches[regexMatches.length - 1][0].slice(0, -1);
                map[parentId].children.push(folder);
            }
        });

        return arr[0];
    }

    getDescendants(): Promise<Folder[]> {
        return Folder.createQueryBuilder().select('*').where('path <@ :path', { path: this.path }).execute();
    }

    async getDescendantsTree(): Promise<Folder> {
        const childrenArr = await this.getDescendants();
        return this.arrayToTree(childrenArr);
    }

    // Returns A tuple
    // 1st element is an array of updated Folders
    // 2nd element is th enumber of affected entities
    move(targetFolderPath: string): Promise<[Folder[], number]> {
        // $1: Target path
        // $2: Source path
        // Concatenates target path with the source's id
        // We use the id as path markers
        return Folder.query(
            'update folder set path = $1 || subpath(path, nlevel($2) - 1) where path <@ $2 returning *',
            [targetFolderPath, this.path],
        );
    }
}
