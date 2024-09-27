import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'hugo',
      email: 'hugo@gmail.com',
      subscriptionDate: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'mariami',
      email: 'mariami@gmail.com',
      subscriptionDate: new Date(
        new Date().setDate(new Date().getDate() + 30),
      ).toISOString(),
    },
  ];

  create(createUserDto: CreateUserDto) {
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      ...createUserDto,
      subscriptionDate: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((el) => el.id === +id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException('User not found');

    const lastId = this.users[this.users.length - 1]?.id || 0;
    const updatedUser = {
      id: lastId,
      subscriptionDate: new Date().toISOString(),
      ...updateUserDto,
    };

    this.users.push(updatedUser);
    return updatedUser;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new NotFoundException('User not found');

    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser[0];
  }
}
