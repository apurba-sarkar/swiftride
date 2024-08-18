const mongoose = require("mongoose");
// const URI = process.env.URI
const ID = process.env.ID;
const PASSWORD = process.env.PASSWORD;
const URI = `mongodb+srv://${ID}:${PASSWORD}@cluster0.ackzl.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0`;
const connectdb = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

module.exports = connectdb;
