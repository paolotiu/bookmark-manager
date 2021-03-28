import { Bookmark } from '@entity/Bookmark';
import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from './Category';

@Entity()
export class BookmarkToCategory extends BaseEntity {
    @PrimaryColumn('int')
    bookmarkId: number;

    @PrimaryColumn('int')
    categoryId: number;

    @ManyToOne(() => Bookmark, (bookmark) => bookmark.categoryConnection)
    @JoinColumn({ name: 'bookmarkId' })
    bookmark: Bookmark;

    @ManyToOne(() => Category, (cat) => cat.bookConnection)
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}
export type BookMarkToCategoryModel = BookmarkToCategory;
