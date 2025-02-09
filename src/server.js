const express = require('express');
const cors = require('cors');
const cardRoutes = require('./routes/cards');
const eraRoutes = require('./routes/eras');
const playerRoutes = require('./routes/players');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/cards', cardRoutes);
app.use('/api/eras', eraRoutes);
app.use('/api/players', playerRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen("0.0.0.0", PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
