import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedDb1660657185844 implements MigrationInterface {
    name = 'SeedDb1660657185844'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
          `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`
        );

        //password = 123
        await queryRunner.query(
          `INSERT INTO users (username, email, password) 
                  VALUES ('123', '123@test.by', '$2b$10$Slg3.yQarMTSER27VXYhI.Ffv5owSM6mZ5U/nKHX6o/U5GukaGXki')`
        );

        await queryRunner.query(
          `INSERT INTO articles (slug, title, description, body, "tagList", "authorId")
          VALUES ('first article', 'first article', 'first article desc', 'first article body', 'coffee, dragons', 1)`
        );

        await queryRunner.query(
          `INSERT INTO articles (slug, title, description, body, "tagList", "authorId")
          VALUES ('second article', 'second article', 'second article desc', 'second article body', 'coffee, dragons', 1)`
        );
    }

    public async down(): Promise<void> {}

}
