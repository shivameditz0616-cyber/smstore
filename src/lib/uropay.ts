// FRONTEND CODE - 100% SECURE
// No secret keys are exposed here. It calls the serverless backend.

export const createUroPayOrder = async (orderData: any) => {
  try {
    // Determine current origin for the redirect URL
    const redirectUrl = `${window.location.origin}/payment-success?order_id=${orderData.orderId}`;

    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderData.orderId,
        amount: orderData.amount,
        name: orderData.userName,
        email: orderData.email,
        phone: orderData.phone,
        redirectUrl: redirectUrl
      }),
    });

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Payment init error:", error);
    return { success: false };
  }
};

export const verifyUroPayPayment = async (orderId: string, paymentId: string) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, paymentId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Payment verification error:", error);
    return { success: false };
  }
};
