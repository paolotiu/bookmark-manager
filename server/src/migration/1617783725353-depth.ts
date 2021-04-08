import { MigrationInterface, QueryRunner } from 'typeorm';

export class depth1617783725353 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('ALTER TABLE folder DROP COLUMN depth;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
