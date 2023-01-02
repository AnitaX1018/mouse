const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  point: {
    type: String,
  },
  record: {
    type: String,
  },
});
module.exports = mongoose.model("userData", Schema);
