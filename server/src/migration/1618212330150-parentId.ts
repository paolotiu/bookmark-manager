import { MigrationInterface, QueryRunner } from 'typeorm';

export class parentId1618212330150 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`UPDATE folder
                            set "parentId" =
                            CASE 
                                WHEN nlevel(folder.path) = 1 THEN null
                                ELSE ltree2text(subpath(folder.path, -2, 1))::int
                            END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
