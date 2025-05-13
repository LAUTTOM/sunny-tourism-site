// api/status-callback.js

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const data = req.body;

  // 1. 配置你的商户 Secret Key
  const secretKey = '你的SecretKey';  // ← 替换

  // 2. 拼接待签名字符串
  const signString = [
    data.m_operation_id,
    data.m_operation_ps,
    data.m_operation_date,
    data.m_operation_pay_date,
    data.m_shop,
    data.m_orderid,
    data.m_amount,
    data.m_curr,
    data.m_desc,
    data.m_status,
    secretKey
  ].join(':');

  const expectedSign = crypto
    .createHash('sha256')
    .update(signString)
    .digest('hex')
    .toUpperCase();

  // 3. 验签
  if (data.m_sign !== expectedSign) {
    return res.status(400).send('Invalid sign');
  }

  // 4. 状态合法，写入你的存储
  // TODO: 把 data.m_orderid, data.m_status, data.m_amount, data.m_curr, data.m_operation_id, data.m_operation_date 等字段，
  // 保存到你的数据库、Google Sheet、Airtable 或者其他地方。
  // 例如：
  // await myDb.collection('orders').updateOne(
  //   { orderid: data.m_orderid },
  //   { $set: { status: data.m_status, updated: new Date() } },
  //   { upsert: true }
  // );

  // 5. 返回给 Payeer “OK{orderid}”
  res.status(200).send('OK' + data.m_orderid);
}
