// api/create-order.js

import crypto from 'crypto';

export default function handler(req, res) {
  // 1. 从查询参数里获取 orderid 和 amount
  const { orderid, amount } = req.query;
  if (!orderid || !amount) {
    return res.status(400).json({ error: '缺少 orderid 或 amount 参数' });
  }

  // 2. Payeer 商户配置
  const shopId    = 'P1000000';          // ← 替换成你的 Shop ID
  const secretKey = '你的SecretKey';     // ← 替换成你的 Secret key
  const currency  = 'USD';               // 或者你使用的其他币种

  // 3. 生成备注（Base64 编码）
  const description = Buffer
    .from(`柬埔寨一日游（订单 ${orderid}）`)
    .toString('base64');

  // 4. 按文档顺序拼接签名字符串并 SHA256
  const stringToSign = [
    shopId,
    orderid,
    amount,
    currency,
    description,
    secretKey
  ].join(':');

  const sign = crypto
    .createHash('sha256')
    .update(stringToSign)
    .digest('hex')
    .toUpperCase();

  // 5. 拼接支付链接
  const params = new URLSearchParams({
    m_shop:    shopId,
    m_orderid: orderid,
    m_amount:  amount,
    m_curr:    currency,
    m_desc:    description,
    m_sign:    sign
  });

  const payUrl = `https://payeer.com/merchant/?${params.toString()}`;

  // 6. 返回给前端
  res.status(200).json({ url: payUrl });
}
