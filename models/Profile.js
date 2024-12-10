const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  time100m: {
    type: Number,
    required: false,
  },
  time200m: {
    type: Number,
    required: false,
  },

  time400m: {
    type: Number,
    required: false,
  },

  time800m: {
    type: String,
    required: false,
  },

  time1500m: {
    type: String,
    required: false,
  },

  time3000m: {
    type: String,
    required: false,
  },
  availability: {
    type: String,
    required: true,
  },
  workoutPreference: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
