const mongoose = require("mongoose");
const Task = require("../Models/Task");

async function CreateTask(newTask) {
  try {
    console.log(newTask)
    const newTaskDB = new Task({
      ...newTask,
      date: newTask.date.split("T")[0]
    });
    await newTaskDB.save();
    return true;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function GetAllQuestion() {
  try {
    const questionList = await Questions.find().lean().sort({ askedOn: -1 });
    return questionList;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function DeleteQuestion(id, email) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Invalid";
    }
    const question = await Questions.findOne({ _id: id });
    if (question.userEmail === email) {
      console.log(question.userEmail);
      await Questions.deleteOne({ _id: id });
      return true;
    }
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}


module.exports = { CreateTask, GetAllQuestion, DeleteQuestion,  };
