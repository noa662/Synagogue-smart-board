import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function StripePayment() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error.message);
      return;
    }

    const res = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod: paymentMethod.id }),
    });

    const data = await res.json();
    if (data.success) {
      alert('התשלום הצליח');
    } else {
      alert('אירעה שגיאה בתשלום');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>שלם</button>
    </form>
  );
}

export default StripePayment;
