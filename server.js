/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true, ///This returns a promise
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('Database Connection Successful!! ✔'));

//------------------------------------------------//
//---------------STARTING SERVER------------------//
//------------------------------------------------//

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App is running on port ${port}...`);
});
