const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const app = require('./app');
const mongoose = require('mongoose');
const { mongodbUri } = require('./config');

// Connect to MongoDB
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  try {
    await mongoose.connection.db.collection('notes').createIndexes([
      { key: { title: 'text', content: 'text' } }
    ]);
    console.log('MongoDB connected and index created');
  } catch (error) {
    console.error('Error creating index:', error);
  }
});

// Set the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
