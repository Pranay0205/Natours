const app = require('./app');

//------------------------------------------------//
//---------------STARTING SERVER------------------//
//------------------------------------------------//

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
