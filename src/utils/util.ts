/*
 * @Author: yancheng 404174228@qq.com
 * @Date: 2024-07-10 15:50:22
 * @LastEditors: yancheng 404174228@qq.com
 * @LastEditTime: 2024-07-10 15:51:58
 * @Description:
 */
import * as crypto from 'crypto';

export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
