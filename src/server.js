require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');


db.authenticate()
.then(() => console.log('Database Authenticated'))
.catch((err) => console.log(err))

initModel()

db.sync()
.then(() => console.log('Database synced'))
.catch((err) => console.log(err))

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! 👌`);
});
