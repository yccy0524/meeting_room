/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 09:52:34
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-10 16:13:45
 * @Description:
 */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity({
  name: 'roles',
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    comment: '角色名',
  })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
  })
  permissions: Permission[];
}
