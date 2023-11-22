var express = require("express");
var router = express.Router();
const { AuthorizeUser } = require("../Controller/loginController");
const {
  CreateTask,
  GetAllTask,
  updateStatus,
  updateSumarry,
  DeleteQuestion,
} = require("../Controller/taskController");

router.get("/", async function (req, res, next) {
  try {
    res.json(await GetAllTask());
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

router.patch("/update/status", async function (req, res, next) {
  const auth_token = req.headers.authorization.split(" ")[1];
  const {taskId,status} = req.body;
  try {
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(400).send("Invalid");
    } else {
      res.json(await updateStatus(taskId,status));
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Server Busy");
  }
});

router.post("/update/sumarry", async function (req, res, next) {
  const auth_token = req.headers.authorization.split(" ")[1];
  const {taskId,sumarry, description} = req.body;
  try {
    var loginCredentials = await AuthorizeUser(auth_token);
    if (loginCredentials === false) {
      res.status(400).send("Invalid");
    } else {
      res.json(await updateSumarry(taskId,sumarry, description));
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
