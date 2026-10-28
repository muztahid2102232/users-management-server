import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const client = new MongoClient(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-vs9p2u4-shard-00-00.eslwacu.mongodb.net:27017,ac-vs9p2u4-shard-00-01.eslwacu.mongodb.net:27017,ac-vs9p2u4-shard-00-02.eslwacu.mongodb.net:27017/?ssl=true&replicaSet=atlas-12nm8i-shard-0&authSource=admin`,
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient=await connectToMongoDB();
const connectedDB=connectedClient.db("simpleCrudDB");
const dbCollection=connectedDB.collection("users");


app.get("/users", async (req, res) => {
  const cursor=dbCollection.find({});
   const allUsers = await cursor.toArray();
  res.send(allUsers);
});

app.get("/users/:id", async(req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)};
  const individualUser= await dbCollection.findOne(query);
  res.send(individualUser);
})

app.delete("/users/:id", async(req,res)=>{
  const id=req.params.id;
  const query={_id:new ObjectId(id)};
  const deletedUser=await dbCollection.deleteOne(query);
  res.send(deletedUser);
})

app.patch("/users/:id",async(req,res)=>{
  const id=req.params.id;
  const updatedUser=req.body;
const filter={_id: new ObjectId(id)};
const options={upsert:true};
const updateDoc={$set:{
  name: updatedUser.name,
  email:updatedUser.email
}}

const finalUpdatedUser=await dbCollection.updateOne(filter,updateDoc,options);
res.send(finalUpdatedUser);
})

app.post("/users",async(req,res)=>{
  console.log('data after submission', req.body);
  const newUser = await dbCollection.insertOne(req.body);
  res.send(newUser);;
})

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});


