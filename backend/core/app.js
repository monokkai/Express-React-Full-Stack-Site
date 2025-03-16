const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello! Use:  '/users', '/users/:id' and '/logger' to get info");
});

// app.use((req, res, next) => {
//   const log = {
//     date: new Date().toString(), //toISOString if it doesnt work !!
//     method: req.method,
//     url: req.url, //originalUrl maybe if it doesnt work !!
//     userId: req.params.id || null,
//   };
//   fs.appendFileSync("./database/logs.log", JSON.stringify(log) + "\n");
//   next();
// });

// User
app.get("/users", (req, res) => {
  console.log(__dirname);
  const userFile = fs.readFileSync("./database/users.json", "utf-8");
  return res.send(200, JSON.parse(userFile));
});

app.get("/users/:id", (req, res) => {
  const userFile = fs.readFileSync("./database/users.json", "utf-8");
  const users = JSON.parse(userFile);
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User was not found");
  }
  return res.status(200).send(user);
});

//Logger
app.post("/logger", (req, res) => {
  const log = req.body;
  fs.appendFileSync("./database/logs.log", JSON.stringify(log) + "\n");
  res.status(200).send(`Log has written to logs.log`);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
