// api/status-check.js

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const orderid = req.query.orderid;
  if (!orderid) {
    return res.status(400).json({ error: '缺少 orderid 参数' });
  }

  // TODO: 把下面示例替换为你实际的存储查询逻辑
  // 例如从数据库或 Google Sheets 中查：
  // const order = await myDb.collection('orders').findOne({ orderid });
  // if (!order) { return res.status(404).json({ error: '订单不存在' }); }
  //
  // const status = order.status;
  // const updated = order.updated;

  // 以下只是临时代码，用于测试
  const status = 'SUCCESS';      
  const updated = new Date().toISOString();

  res.status(200).json({
    orderid,
    status,
    updated
  });
}
