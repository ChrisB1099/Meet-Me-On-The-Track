const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
    required: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  invitations: {
    type: [],
    require: false,
  },
  sentInvitations: {
    type: [],
    require: false,
  },
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model("User", UserSchema);
