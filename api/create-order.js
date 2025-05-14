// api/create-order.js
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { orderid, amount } = req.query;
  if (!orderid || !amount) {
    return res.status(400).json({ error: 'Missing orderid or amount' });
  }

  const shopId    = '2223847728';      // 替换为你的 Payeer 商户 ID
  const secretKey = 'Nq4C6hvC';// 替换为你的 Secret Key
  const currency  = 'USD';

  // 生成备注（Base64 编码）
  const desc = Buffer.from(`Sunny Tourism Order ${orderid}`)
                     .toString('base64');

  // 拼接签名字段
  const stringToSign = [ shopId, orderid, amount, currency, desc, secretKey ].join(':');
  const sign = crypto.createHash('sha256')
                     .update(stringToSign)
                     .digest('hex')
                     .toUpperCase();

  // 生成支付链接
  const params = new URLSearchParams({
    m_shop:   shopId,
    m_orderid: orderid,
    m_amount:  amount,
    m_curr:    currency,
    m_desc:    desc,
    m_sign:    sign
  });

  const url = `https://payeer.com/merchant/?${params.toString()}`;
  res.status(200).json({ url });
}
