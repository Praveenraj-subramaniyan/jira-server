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

async function GetAllTask() {
  try {
    const TaskList = await Task.find().lean();
    return TaskList;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}


async function updateStatus(taskId,status) {
  try {
    const taskToUpdate = await Task.findById(taskId);
    if (!taskToUpdate) {
      return "Task not found";
    }
    taskToUpdate.status = status;
    await taskToUpdate.save();
    return true;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
  }
  
  async function updateSumarry(taskId,sumarry, description) {
    try {
      const taskToUpdate = await Task.findById(taskId);
      if (!taskToUpdate) {
        return "Task not found";
      }
      taskToUpdate.sumarry = sumarry;
      taskToUpdate.description = description;
      await taskToUpdate.save();
      return true;
    } catch (error) {
      console.log(error);
      return "Server Busy";
    }
    }

    
    async function updatePriority(taskId,priority) {
      try {
        const taskToUpdate = await Task.findById(taskId);
        if (!taskToUpdate) {
          return "Task not found";
        }
        taskToUpdate.priority = priority;
        await taskToUpdate.save();
        return true;
      } catch (error) {
        console.log(error);
        return "Server Busy";
      }
      }

async function DeleteTask(id, email) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "Invalid";
    }
    const task = await Task.findOne({ _id: id });
      await task.deleteOne({ _id: id });
      return true;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}


module.exports = { CreateTask, GetAllTask,updateStatus, DeleteTask, updateSumarry,updatePriority};
