import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ArticleEntity } from '@app/article/article.entity';
const bcrypt = require('bcrypt');

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column({ default: '' })
  bio: string

  @Column()
  username: string

  @Column({ default: '' })
  image: string

  @Column({ select: false })
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[]

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[]
}
