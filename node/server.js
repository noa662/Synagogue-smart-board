const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_SECRET_KEY');
app.use(express.json());

app.post('/api/payment', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // מחיר בשקלים אגורות
      currency: 'ils',
      payment_method: req.body.paymentMethod,
      confirm: true
    });

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3001, () => console.log('שרת רץ על פורט 3001'));