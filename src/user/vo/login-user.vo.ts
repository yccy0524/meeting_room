/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-14 22:19:16
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-14 22:20:50
 * @Description:
 */
interface UserInfo {
  id: number;

  username: string;

  nickName: string;

  email: string;

  headPic: string;

  phoneNumber: string;

  isFrozen: boolean;

  isAdmin: boolean;

  createTime: Date;

  roles: string[];

  permissions: string[];
}
export class LoginUserVo {
  userInfo: UserInfo;

  accessToken: string;

  refreshToken: string;
}
