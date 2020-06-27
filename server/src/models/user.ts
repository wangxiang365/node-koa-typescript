import { Model, Table, Column } from 'sequelize-typescript'

@Table({
  tableName: 'user'       // 表名
})
export default class User extends Model<User> {
  @Column({
    comment: '自增ID',
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({
    comment: '用户名',
  })
  user_name: string

  @Column({
    comment: '昵称',
    defaultValue: 0,
  })
  nick_name: string

  @Column({
    comment: '密码',
  })
  password: string

  @Column({
    comment: '手机',
  })
  phone: number

  @Column({
    comment: '地址',
  })
  address: string

  @Column({
    comment: '创建时间',
  })
  create_time: Date

  @Column({
    comment: '更新时间',
  })
  update_time: Date

  @Column({
    comment: '邮箱',
  })
  email: string

  @Column({
    comment: '性别',
  })
  sex: number

  @Column({
    comment: '生日',
  })
  birthday: string
}
