import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1753530248446 implements MigrationInterface {
  name = 'Init1753530248446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`publicIp\` \`publicIp\` varchar(45) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`deviceOs\` \`deviceOs\` varchar(45) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`city\` \`city\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`region\` \`region\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`country\` \`country\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`location\` \`location\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`postal\` \`postal\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`timezone\` \`timezone\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`first_name\` \`first_name\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`user_name\` \`user_name\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`verifyCode\` \`verifyCode\` varchar(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`token\` \`token\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`token\` \`token\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`session\` CHANGE \`verifyCode\` \`verifyCode\` varchar(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(50) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`user_name\` \`user_name\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`last_name\` \`last_name\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`first_name\` \`first_name\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(0) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`updated_at\` \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`timezone\` \`timezone\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`postal\` \`postal\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`location\` \`location\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`country\` \`country\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`region\` \`region\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`city\` \`city\` varchar(100) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`deviceOs\` \`deviceOs\` varchar(45) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user-info\` CHANGE \`publicIp\` \`publicIp\` varchar(45) NULL DEFAULT 'NULL'`,
    );
  }
}
