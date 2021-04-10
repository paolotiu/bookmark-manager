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

    @Column('int')
    userId: number;

    @Column('int', { nullable: true })
    parentId?: number;

    @Column('ltree', { nullable: true })
    path: string;

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
        arr.forEach((folder) => {
            map[folder.id] = folder; // initialize the map
            folder.children = []; // initialize the children
        });

        arr.forEach((folder, i) => {
            const regex = /\w+\./g;
            const regexMatches = [...folder.path.matchAll(regex)];
            const id = regexMatches.length ? regexMatches[regexMatches.length - 1][0].slice(0, -1) : null;

            // Skip root node
            if (i && id) {
                // Gets the parent id from the path
                // 1.2.3 => 2
                const parentId = id;
                map[parentId].children.push(folder);
            }
        });

        return map[this.id];
    }

    getDescendants(): Promise<Folder[]> {
        return Folder.createQueryBuilder()
            .select('*')
            .where('path <@ :path', { path: this.path })
            .orderBy('nlevel(path)', 'ASC')
            .execute();
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
