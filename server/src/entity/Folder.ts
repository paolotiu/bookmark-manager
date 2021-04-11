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
    parentId: number | null;

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

    // private arrayToTree(arr: Folder[]): Folder {
    //     const map: Record<string, Folder> = {};
    //     arr.forEach((folder) => {
    //         map[folder.id] = folder; // initialize the map
    //         folder.children = []; // initialize the children
    //     });

    //     arr.forEach((folder) => {
    //         // const regex = /\w+\./g;
    //         // const regexMatches = [...folder.path.matchAll(regex)];
    //         // const id = regexMatches.length ? regexMatches[regexMatches.length - 1][0].slice(0, -1) : null;

    //         // Skip root node
    //         if (folder.parentId !== this.parentId && folder.parentId !== null) {
    //             // Gets the parent id from the path
    //             // 1.2.3 => 2
    //             map[folder.parentId].children.push(folder);
    //         }
    //     });

    //     return map[this.id];
    // }

    getDescendants(): Promise<Folder[]> {
        return Folder.createQueryBuilder()
            .select('*')
            .where('path <@ :path', { path: this.path })
            .orderBy('nlevel(path)', 'ASC')
            .execute();
    }

    async getDescendantsTree(): Promise<Folder> {
        const childrenArr = await this.getDescendants();
        return arrayToTree({
            foldersArr: childrenArr,
            parentId: this.id,
        });
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
            'update folder set path = $1 || subpath(path, nlevel($2) - 1), depth = nlevel($1), "parentId" = ltree2text(subpath($1, -1, 1))::int where path <@ $2 returning *',
            [targetFolderPath, this.path],
        );
    }

    // Returns the values as move
    // moves the folder to the top level (root)
    moveToRoot(): Promise<[Folder[], number]> {
        return Folder.query(
            'update folder set path = subpath(path, nlevel($1) - 1), depth = 0, "parentId" = null where path <@ $1 returning *',
            [this.path],
        );
    }
}

export const getFolderStructure = async (userId: number): Promise<Folder[]> => {
    const foldersArr = await Folder.find({ where: { userId }, order: { path: 'ASC' } });

    // Delte unnecesarry field
    foldersArr.forEach((folder: Partial<Folder>) => {
        delete folder.createdDate;
        delete folder.deleted;
        delete folder.path;
        delete folder.userId;
    });
    return arrayToTreeWithRoot({ foldersArr });
};

interface ArrayToTreeWithRoot {
    foldersArr: Folder[];
}

interface ArrayToTreeWithParent {
    foldersArr: Folder[];
    parentId: number;
}

function arrayToTree({ parentId, foldersArr }: ArrayToTreeWithParent) {
    const map: Record<string, Folder> = {};

    foldersArr.forEach((folder) => {
        map[folder.id] = folder; // initialize the map
        folder.children = []; // initialize the children
    });

    foldersArr.forEach((folder) => {
        // Skip root node
        if (folder.id !== parentId && folder.parentId !== null) {
            map[folder.parentId].children.push(folder);
        }
    });
    return map[parentId];
}

function arrayToTreeWithRoot({ foldersArr }: ArrayToTreeWithRoot) {
    const map: Record<string, Folder> = {};
    const roots: Folder[] = [];

    foldersArr.forEach((folder) => {
        map[folder.id] = folder; // initialize the map
        folder.children = []; // initialize the children
    });

    foldersArr.forEach((folder) => {
        // Skip root node
        if (folder.parentId !== null) {
            // Gets the parent id from the path
            // 1.2.3 => 2
            map[folder.parentId].children.push(folder);
        } else {
            roots.push(folder);
        }
    });
    return roots;
}
