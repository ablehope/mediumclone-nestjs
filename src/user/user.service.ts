import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { JWT_SECRET } from '@app/config/config';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email
    })
      const userByUsername = await this.userRepository.findOne({
        email: createUserDto.username
      })
      if(userByEmail || userByUsername) {
        throw new HttpException('Email or username already taken', HttpStatus.UNPROCESSABLE_ENTITY)
      }
      const newUser = new UserEntity();
      Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({email: loginUserDto.email},
      {select: ['id', 'username', 'email', 'bio', 'image', 'password']})
    if(!user) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const isPasswordCorrect = await bcrypt.compare(loginUserDto.password, user.password);
    if(!isPasswordCorrect) {
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    delete user.password;

    return user;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(userId);

    if(!user) {
      throw new HttpException('UserId is not valid', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

   findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id)
  }

  generateJwt(user: UserEntity): string {
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email
    }, JWT_SECRET)
    return token
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user)
      }
    }
  }
}
