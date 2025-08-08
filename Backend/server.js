require("dotenv").config();
const app = require("./src/app");


app.get('/', (req, res) => {
  res.send('Hello, World!');
} );


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
