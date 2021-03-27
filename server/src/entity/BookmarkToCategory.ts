import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BookmarkToCategory extends BaseEntity {
    @PrimaryColumn('int')
    bookmarkId: number;

    @PrimaryColumn('int')
    categoryId: number;
}
