import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1754830417318 implements MigrationInterface {
    name = 'Init1754830417318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user-info\` (\`id\` varchar(36) NOT NULL, \`publicIp\` varchar(45) NULL, \`deviceOs\` varchar(45) NULL, \`city\` varchar(100) NULL, \`region\` varchar(100) NULL, \`country\` varchar(100) NULL, \`location\` varchar(100) NULL, \`postal\` varchar(100) NULL, \`timezone\` varchar(100) NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` varchar(36) NOT NULL, \`verifyCode\` varchar(6) NULL, \`status\` enum ('Pending', 'VerifyCode', 'Used', 'Login') NOT NULL DEFAULT 'Pending', \`token\` text NULL, \`user_id\` varchar(255) NULL, \`expiredAt\` timestamp NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(100) NULL, \`last_name\` varchar(100) NULL, \`user_name\` varchar(100) NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(50) NULL, \`avatar\` varchar(100) NULL, \`role\` enum ('admin', 'editor', 'viewer', 'user') NOT NULL DEFAULT 'user', \`permissions\` json NOT NULL DEFAULT '[]', \`is_activated\` tinyint NOT NULL DEFAULT 0, \`verifiedAt\` timestamp NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, INDEX \`IDX_USER_USERNAME\` (\`user_name\`), INDEX \`IDX_USER_ROLE\` (\`role\`), INDEX \`IDX_USER_IS_ACTIVATED\` (\`is_activated\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` timestamp(0) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user-info\` ADD CONSTRAINT \`FK_2be1fc92f14190f890f36979880\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_30e98e8746699fb9af235410aff\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_30e98e8746699fb9af235410aff\``);
        await queryRunner.query(`ALTER TABLE \`user-info\` DROP FOREIGN KEY \`FK_2be1fc92f14190f890f36979880\``);
        await queryRunner.query(`DROP TABLE \`companies\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_USER_IS_ACTIVATED\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_USER_ROLE\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_USER_USERNAME\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP TABLE \`user-info\``);
    }

}
