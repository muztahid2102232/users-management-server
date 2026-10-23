import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const users = [
  {
    id: 1,
    name: "Rahim Ahmed",
    email: "rahim@example.com",
  },
  {
    id: 2,
    name: "Karim Hasan",
    email: "karim@example.com",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    email: "tanvir@example.com",
  },
  {
    id: 5,
    name: "Sadia Akter",
    email: "sadia@example.com",
  },
];

app.get("/", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
