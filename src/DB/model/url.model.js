const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const urlSchema = new Schema({ urlCode: String, longUrl: String, shortUrl: String, clickCount: Number });
const urlModel = Mongoose.model("url", urlSchema);
module.exports = urlModel;
