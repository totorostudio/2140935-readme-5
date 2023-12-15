import { compare, genSalt, hash } from 'bcrypt';
import { AuthUser, UserRole } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public avatar: string;
  public dateRegister: Date;
  public role: UserRole;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user)
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      dateRegister: this.dateRegister,
      role: this.role,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.name = data.name;
    this.avatar = data.avatar;
    this.dateRegister = data.dateRegister;
    this.role = data.role;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
