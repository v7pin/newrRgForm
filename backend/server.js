const express = require('express');
const cors = require('cors');
const { Registration } = require('./models');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/registration', async (req, res) => {
  const { name, email, phone, interests } = req.body;

  if (!name || !email || !phone || interests.length === 0) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const registration = await Registration.create({ name, email, phone, interests });
    res.status(200).json({ message: 'Registration received successfully', registration });
  } catch (error) {
    console.error('Failed to insert registration:', error);
    res.status(500).json({ error: 'Failed to submit registration' });
  }
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
