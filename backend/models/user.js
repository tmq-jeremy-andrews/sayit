const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  verified: {
    type: Boolean,
    default: false,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  contacts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    unique: true,
  },
});

// Static signup method
userSchema.statics.signup = async function (email, password, phone, name) {
  if (!email || !password || !phone || !name) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak");
  }

  // TODO Refine validation to allow non-latin characters
  let fullName = name.first + name.last;
  fullName = fullName.replace(/\s+/g, "");
  if (!validator.isAlpha(fullName)) {
    throw Error("Name is invalid");
  }

  if (!validator.isMobilePhone(phone)) {
    throw Error(
      "Phone number is not recognized as a valid format in any country"
    );
  }

  // Check if the email is already registered
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  // Check if the number is already associated with an account
  const numberExists = await this.findOne({ number: phone });
  if (numberExists) {
    throw Error("Number is already in use");
  }

  // Salt and hash the plaintext password
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(password, salt);

  // Save credentials to database
  const user = await this.create({
    email,
    password: hash,
    name,
    number: phone,
  });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid username/password");
  }

  // Compare if hashes match
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid username/password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
