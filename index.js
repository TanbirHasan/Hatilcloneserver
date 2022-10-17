const express = require("express");

const cors = require("cors");

require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
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
      const categories = req.query.category;
      console.log(categories);

      const query = { categories };

      const cursor = officecategoryproducts.find(query);
      const officeproducts = await cursor.toArray();
      res.send(officeproducts);
    });
  } catch (err) {}
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("server is running");
});
