const express = require("express");

const cors = require("cors");

require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(cors());
const uri = `mongodb+srv://dbuser:N8KmOF4J9QBuhwYv@cluster0.lhugu15.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
  res.send("Hello, server is running");
});

async function run() {
  try {
    await client.connect();

    const officecategory = client.db("office").collection("officecategory");
    const officecategoryproducts = client
      .db("office")
      .collection("officecategoryproducts");

    // getting products based on specific category

    app.get("/officeproducts", async (req, res) => {
      const category = req.query.category;
      console.log(category);

      const query = { category };

      const cursor = officecategoryproducts.find(query);
      const officeproducts = await cursor.toArray();
      res.send(officeproducts);

      // getting single products

      app.get("/products/find/:id", async (req, res) => {
        const id = req.params.id;

        const query = { _id: ObjectId(id) };
        const order = await officecategoryproducts.findOne(query);
        res.send(order);
      });
    });
  } catch (err) {}
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running");
});
