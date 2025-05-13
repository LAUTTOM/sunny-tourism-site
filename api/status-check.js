// api/status-check.js

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const orderid = req.query.orderid;
  if (!orderid) {
    return res.status(400).json({ error: '缺少 orderid 参数' });
  }

  // TODO: 从你的存储中读取该 orderid 的最新状态
  // 例如：
  // const order = await myDb.collection('orders').findOne({ orderid });
  // if (!order) { return res.status(404).json({ error: '订单不存在' }); }
  //
  // const status = order.status;
  // const updated = order.updated;

  // 临时示例：直接返回一个假状态
  const status = 'SUCCESS';      // ← 测试时可改为 SUCCESS/FAIL/PROCESSING
  const updated = new Date().toISOString();

  // 正式使用时，请把上面两行替换为你实际取到的值
  res.status(200).json({
    orderid,
    status,
    updated
  });
}
