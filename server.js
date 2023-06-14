const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/getuser", async (req, res) => {
  let results = await user.find();
  res.json(results);
});

app.listen(2222, () => {
  console.log(`Listening to port 2222`);
});

let connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://karthick:karthick@cluster0.wjwwudt.mongodb.net/users?retryWrites=true&w=majority"
    );
    console.log(`Successfully connected to Mongo Atlas DB`);
    storeDataIntoMDB();
  } catch {
    console.log(`Unable to connect to Mongo Atlas DB`);
  }
};

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, "Too small name"],
    maxLength: [30, "Too big name"],
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "User email id required"],
  },

  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: ["male", "female"],
      message: "{value} is not a valid gender",
    },
  },
  maritalStatus: {
    type: String,
    required: true,
    lowercase: true,
    enum: {
      values: ["single", "married"],
      message: "{value} is not a valid status",
    },
  },
  age: {
    type: Number,
    required: true,
    min: [18, "To early to create account"],
    max: [80, "To late to create account"],
  },
  batchId: Number,
});

let user = new mongoose.model("user", userSchema);

let storeDataIntoMDB = async () => {
  try {
    let karthick = new user({
      firstName: "Prasanna",
      lastName: "AB",
      email: "prasanna@gmail.com",
      gender: "Male",
      maritalStatus: "married",
      age: 28,
      batchId: 2301,
    });
    await user.insertMany([karthick]);
    console.log(`Successfully saved into MDB`);
  } catch {
    console.log(`Unable to store data into MDB`);
  }
};

connectToMDB();
