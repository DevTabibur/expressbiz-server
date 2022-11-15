const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// stripe for payment
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

// user: expressbiz
// pswd: mjtrQI6rxrdViLl4

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hc4xz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized", code: 401 });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "forbidden", code: 403 });
    }

    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    await client.connect();
    const registerCollection = client.db("expressbiz").collection("register");
    const loginCollection = client.db("expressbiz").collection("login");
    const servicesCollection = client.db("expressbiz").collection("services");
    const quoteCollection = client.db("expressbiz").collection("quote");
    const usersCollection = client.db("expressbiz").collection("users");
    const reviewCollection = client.db("expressbiz").collection("review");
    const paymentCollection = client.db("expressbiz").collection("payment");
    const createShippingCollection = client
      .db("expressbiz")
      .collection("createShipping");

    const verifyAdmin = async (req, res, next) => {
      const requester = req.decoded.email;
      const requesterAccount = await usersCollection.findOne({
        email: requester,
      });
      if (requesterAccount.role === "admin") {
        next();
      } else {
        res.status(403).send({ message: "forbidden" });
      }
    };

    // 1.register routes
    app.get("/register", async (req, res) => {
      const result = await registerCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/register", async (req, res) => {
      const name = req.body.name;
      const email = req.body.email;
      const confirmPassword = req.body.confirmPassword;
      const saltRounds = 10;

      const securePassword = bcrypt.hash(
        confirmPassword,
        saltRounds,
        async function (err, hash) {
          // Store hash in your password DB.

          // console.log("HASH", hash);
          const hashPassword = hash;
          const dataExist = await registerCollection.findOne({
            email: email,
          });

          if (dataExist) {
            return res
              .status(300)
              .json({ error: "Email is already exist!", code: 300 });
          } else {
            const result = await registerCollection.insertOne({
              name,
              email,
              password: hashPassword,
              user: true,
            });
            // console.log('result', result)
            return res.send(result);
          }
        }
      );
    });

    app.get("/register/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await registerCollection.findOne(query);
      res.send(result);
      // console.log('id', id)
    });

    // update a specific object
    app.patch("/register/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      // console.log("first", id, req.body);

      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          user: body.user,
        },
      };
      const result = await registerCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.delete("/register/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await registerCollection.deleteOne(query);
      res.send(result);
      // console.log('id', id)
    });

    // 2.login routes
    app.get("/login", async (req, res) => {
      const result = await loginCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/login", async (req, res) => {
      try {
        // console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await registerCollection.findOne({
          email: email,
        });

        // console.log('userEmail', userEmail)
        if (userEmail) {
          const id = userEmail._id;
          // console.log('userEmail', userEmail._id)
          const isMatched = bcrypt.compare(
            password,
            userEmail.password,
            (err, result) => {
              // console.log("result", result);
              if (result) {
                // console.log("result", result);
                res.status(200).send({ message: "success", id: id, code: 200 });
              } else {
                res.status(401).send({
                  response: "Unauthorized response, Try again",
                  code: 401,
                });
              }
            }
          );
        } else {
          res.status(401).send({ error: "Authentication Error", code: 401 });
        }
      } catch (error) {
        console.log("error", error);
        // res.status(400).send("Invalid Login Details");
      }
    });

    /// 3. services routes
    app.get("/services", async (req, res) => {
      const result = await servicesCollection.find({}).toArray();
      res.send(result);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.send(result);
    });

    app.post("/services", verifyJWT, async (req, res) => {
      // console.log("body services", req.body);
      const result = await servicesCollection.insertOne(req.body);
      res.send(result);
    });

    app.delete("/services/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);
      res.send(result);
    });

    // 4. Quote  routes
    app.get("/quote", async (req, res) => {
      const result = await quoteCollection.find({}).toArray();
      res.send(result);
    });

    app.get("/quote/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await quoteCollection.findOne(query);
      res.send(result);
    });

    app.post("/quote", async (req, res) => {
      const result = await quoteCollection.insertOne(req.body);
      res.send(result);
    });

    app.delete("/quote/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await quoteCollection.deleteOne(query);
      res.send(result);
    });

    // 5. create shipping routes
    app.get("/shipping", async (req, res) => {
      const result = await createShippingCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/shipping", async (req, res) => {
      // console.log("create-shipping", req.body);
      const result = await createShippingCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/shipping/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await createShippingCollection.findOne(query);
      res.send(result);
    });

    app.patch("/shipping/:id", async (req, res) => {
      const id = req.params.id;
      const payment = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId,
        },
      };

      // send email for their transaction
      const result = await paymentCollection.insertOne(payment);
      const updatedShipping = await createShippingCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(updateDoc);
    });

    app.delete("/shipping/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await createShippingCollection.deleteOne(query);
      res.send(result);
    });

    // 6. user routes
    app.get("/users", verifyJWT, async (req, res) => {
      const result = await usersCollection.find({}).toArray();
      res.send(result);
    });

    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      // console.log("email", email);
      const filter = { email: email };
      const user = req.body;
      // console.log("body", req.body);
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };

      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      // giving every user jwt token
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.send({ result, accessToken: token });
    });

    // 7. review routes

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/review", verifyJWT, async (req, res) => {
      // console.log("review posted", req.body);
      const result = await reviewCollection.insertOne(req.body);
      res.send(result);
    });

    app.delete("/review/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // 8. payment routes

    app.get("/payment", async (req, res) => {
      const result = await paymentCollection.find({}).toArray();
      res.send(result);
    });

    app.post("/create-payment-intent", async (req, res) => {
      const price = 99;
      const amount = price * 100;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // check admin
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email: email });
      const isAdmin = user.role === "admin";
      res.send({ admin: isAdmin });
    });

    // make admin routes
    app.put("/user/admin/:email", verifyJWT, verifyAdmin, async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // LAST +++++++++++++++++++++++++++++++++++++++++
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
