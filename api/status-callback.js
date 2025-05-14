// api/status-callback.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    m_orderid: orderId,
    m_status:  status,
    m_sign:    signature,
    // …其他回调参数可按需接收
  } = req.body;

  if (!orderId || !status || !signature) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // TODO: 在这里验证 signature 是否正确，防止伪造
  // const valid = verifyPayeerSignature(req.body);
  // if (!valid) return res.status(403).json({ error: 'Invalid signature' });

  // TODO: 把 status 写入你的持久化存储，比如数据库
  // await db.collection('orders').updateOne({ id: orderId }, {
  //   $set: { status, updatedAt: new Date() }
  // });

  console.log(`Order ${orderId} status updated to ${status}`);
  return res.status(200).json({ result: 'OK' });
}
