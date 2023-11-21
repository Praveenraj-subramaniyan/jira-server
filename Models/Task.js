const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const taskSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    sumarry: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { collection: "Task" }
);

module.exports = mongoose.model("Task", taskSchema);
