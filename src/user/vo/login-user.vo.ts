import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-14 22:19:16
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-23 16:05:18
 * @Description:
 */
class UserInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  headPic: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  isFrozen: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  createTime: Date;

  @ApiProperty({
    examples: ['管理员'],
  })
  roles: string[];

  @ApiProperty()
  permissions: string[];
}
export class LoginUserVo {
  @ApiProperty()
  userInfo: UserInfo;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
