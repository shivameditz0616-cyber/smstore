export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const UROPAY_API_KEY = "Q59BJZ6L1146KRLN";
  const UROPAY_SECRET_KEY = "76NGA84IHFRAVRWYEK7D7JSP5D7ELICGJXEXMS5C5XS2WIMX6B";
  const UROPAY_BASE_URL = "https://api.uropay.com/v1"; 

  try {
    const { orderId, paymentId } = req.body;

    // Verify payment status with UroPay Servers
    const response = await fetch(`${UROPAY_BASE_URL}/order/status?client_txn_id=${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': UROPAY_API_KEY,
        'x-api-secret': UROPAY_SECRET_KEY,
      }
    });

    const data = await response.json();

    // Standard check: verify if Uropay returns a 'PAID' or 'SUCCESS' status
    if (data && (data.status === 'SUCCESS' || data.status === 'PAID')) {
      return res.status(200).json({ success: true, status: 'paid' });
    } else {
      return res.status(200).json({ success: false, status: 'failed' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
