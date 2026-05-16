export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const UROPAY_API_KEY = "Q59BJZ6L1146KRLN";
  const UROPAY_SECRET_KEY = "76NGA84IHFRAVRWYEK7D7JSP5D7ELICGJXEXMS5C5XS2WIMX6B";
  
  // NOTE: Depending on UroPay's exact endpoint URL, adjust 'https://api.uropay.com/v1' if needed based on their docs.
  const UROPAY_BASE_URL = "https://api.uropay.com/v1"; 

  try {
    const { orderId, amount, name, email, phone, redirectUrl } = req.body;

    // Send request to UroPay to create a payment link/session
    const response = await fetch(`${UROPAY_BASE_URL}/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': UROPAY_API_KEY,
        'x-api-secret': UROPAY_SECRET_KEY,
      },
      body: JSON.stringify({
        client_txn_id: orderId,
        amount: amount.toString(),
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        redirect_url: redirectUrl // Your frontend success page
      })
    });

    const data = await response.json();

    if (data && data.payment_url) {
      return res.status(200).json({ success: true, paymentUrl: data.payment_url });
    } else {
      console.error("UroPay Creation Error:", data);
      return res.status(400).json({ success: false, error: 'Failed to generate UroPay link' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
