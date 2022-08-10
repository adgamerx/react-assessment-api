const express = require("express");
require("./db/connection");
const User = require("./models/users");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/users", async (req, res) => {
  console.time("User Added Time taken");
  try {
    const user = new User(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
  console.timeEnd("User Added Time taken");
});

//for all users
app.get("/users", async (req, res) => {
  try {
    const usersData = await User.find();
    res.status(201).send(usersData);
  } catch (e) {
    res.status(400).send(e);
  }
});

//for individual user
app.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.findById(_id);
    if (!userData) {
      return res.status(404).send();
    } else {
      res.status(201).send(userData);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//update data
app.patch("/users/:id", async (req, res) => {
  console.time("Updated User");
  try {
    const _id = req.params.id;
    const updateUsers = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateUsers);
  } catch (error) {
    res.status(400).send(e);
  }
  console.timeEnd("Updated User");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
