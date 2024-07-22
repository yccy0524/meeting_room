/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 09:49:56
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-22 22:42:07
 * @Description:
 */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.user.dto';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils/util';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Inject(RedisService)
  private redisService: RedisService;

  async register(user: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha_${user.email}`);
    console.log('captcha---', captcha, `captcha_${user.email}`);

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.nickName = user.nickName;

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async login(loginUser: LoginUserDto, isAdmin: boolean) {
    this.logger.debug(`login-------->${JSON.stringify(loginUser)} ${isAdmin}`);
    const foundUser = await this.userRepository.findOne({
      where: {
        username: loginUser.username,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });
    this.logger.debug(`login-------->${JSON.stringify(foundUser)}`);

    if (!foundUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (foundUser.password !== md5(loginUser.password)) {
      throw new HttpException('密码不正确', HttpStatus.BAD_REQUEST);
    }

    const vo = new LoginUserVo();
    vo.userInfo = {
      id: foundUser.id,
      username: foundUser.username,
      nickName: foundUser.nickName,
      email: foundUser.email,
      phoneNumber: foundUser.phoneNumber,
      headPic: foundUser.headPic,
      createTime: foundUser.createTime,
      isFrozen: foundUser.isFrozen,
      isAdmin: foundUser.isAdmin,
      roles: foundUser.roles.map((item) => item.name),
      permissions: foundUser.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };

    return vo;
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['roles', 'roles.permissions'],
    });

    return {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };
  }

  async findUserDetailById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async updatePassword(userId: number, passwordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    const captcha = await this.redisService.get(`captcha_${passwordDto.email}`);
    if (passwordDto.captcha !== captcha) {
      throw new BadRequestException('验证码不正确');
    }

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    user.password = md5(passwordDto.password);
    try {
      await this.userRepository.save(user);
      return '密码修改成功';
    } catch (err) {
      this.logger.error(err, UserService);
      return '密码修改失败';
    }
  }

  async updateUserInfo(userId: number, updateUserDto: UpdateUserDto) {
    const captcha = await this.redisService.get(
      `captcha_${updateUserDto.email}`,
    );
    if (captcha !== updateUserDto.captcha) {
      console.error('验证码不正确----------------');
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    user.headPic = updateUserDto.headPic;
    user.nickName = updateUserDto.nickName;

    try {
      await this.userRepository.save(user);
      return '修改成功';
    } catch (err) {
      this.logger.error(err, UserService);
      return '修改失败';
    }
  }

  // 冻结
  async freezeUserById(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    user.isFrozen = true;

    await this.userRepository.save(user);
  }

  // 获取用户列表
  async getUserList(
    pageNum: number,
    pageSize: number,
    nickName: string,
    username: string,
    email: string,
  ) {
    const condition: Record<string, any> = {};
    const skipCount = (pageNum - 1) * pageSize;

    if (nickName) {
      condition.nickName = Like(`%${nickName}%`);
    }
    if (username) {
      condition.username = Like(`%${username}%`);
    }

    if (email) {
      condition.email = Like(`%${email}%`);
    }

    const [users, totalCount] = await this.userRepository.findAndCount({
      select: [
        'id',
        'username',
        'nickName',
        'headPic',
        'phoneNumber',
        'isFrozen',
        'createTime',
      ],
      skip: skipCount,
      take: pageSize,
      where: condition,
    });
    return {
      list: users,
      total: totalCount,
    };
  }
}
