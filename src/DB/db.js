const mongoose = require("mongoose");
const { DBURL } = require("../../env");
const connectDB = async () => {
  try {
    await mongoose.connect(DBURL, {
      useNewURLParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
