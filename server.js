const mongoose = require("mongoose");
const app = require("./app");
// server
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
// database connection
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database connection is successful`.bgRed.bold);
});

app.listen(port, () => {
  console.log(`App is running on ${port}`.bgYellow.bold);
});


