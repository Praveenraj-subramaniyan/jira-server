var express = require("express");
var router = express.Router();
const { AuthorizeUser } = require("../Controller/loginController");
const {
  CreateTask,
  GetAllQuestion,
  DeleteQuestion,
} = require("../Controller/taskController");

router.get("/", async function (req, res, next) {
  try {
    res.json(await GetAllQuestion());
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

router.post("/create", async function (req, res, next) {
  const auth_token = req.headers.authorization.split(" ")[1];
  const newTask = req.body;
  console.log(newTask)
  try {
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(400).send("Invalid");
    } else {
      res.json(await CreateTask(newTask));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    const auth_token = req.headers.authorization.split(" ")[1];
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(200).send("Invalid");
    } else {
      res.json(await DeleteQuestion(req.params.id, loginCredentials.email));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});



module.exports = router;
