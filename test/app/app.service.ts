import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { CreateUserBodyView } from './views/create-user.view';

@Injectable()
export class AppService {
  private readonly user = {
    name: 'Aaron Alvares',
    email: 'aaa9304@email.com',
    password: '405016dsa',
    extras: {
      birthday: new Date('1993-04-23'),
    },
    metadata: {
      createdAt: new Date('2022-02-06'),
      updatedAt: new Date('2022-02-06'),
    },
  };

  getUser() {
    return this.user;
  }

  createUser(data: CreateUserBodyView) {
    writeFileSync(join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
    console.info(`Save data in file: "${join(__dirname, 'data.json')}"`);
    return {
      success: true,
      createdAt: new Date(),
    };
  }
}
