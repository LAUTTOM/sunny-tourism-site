// api/status-check.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const orderId = req.query.orderid;
  if (!orderId) {
    return res.status(400).json({ error: 'Missing orderid parameter' });
  }

  // TODO: 从你的存储中读取该订单状态
  // const record = await db.collection('orders').findOne({ id: orderId });
  // if (!record) {
  //   return res.status(404).json({ error: 'Order not found' });
  // }

  // 临时示例返回
  const record = {
    orderid: orderId,
    status:  'SUCCESS',                // 或 'FAILURE'
    updated: new Date().toISOString()
  };

  return res.status(200).json(record);
}
