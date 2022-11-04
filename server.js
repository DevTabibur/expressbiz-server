const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

// user: expressbiz
// pswd: mjtrQI6rxrdViLl4

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hc4xz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const loginCollection = client.db("expressbiz").collection("login");

    // 1.login routes
    app.get("/login", async (req, res) => {
      const result = await loginCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/login", async (req, res) => {
      const body = req.body;
    //   console.log("body", body);
      const result = await loginCollection.insertOne(body);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
