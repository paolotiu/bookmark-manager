/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChildrenOrder1621599565623 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`update folder set "childrenOrder" = '{}' where "childrenOrder" = null;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query;
    }
}
