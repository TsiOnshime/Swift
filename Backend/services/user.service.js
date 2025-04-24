const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports.updateUser = async (id, firstname, lastname, email, profileImage) => {
  if (!id) throw new Error("User ID is required");

  const user = await userModel.findById(id);
  if (!user) throw new Error("User not found");

  if (firstname) user.fullname.firstname = firstname;
  if (lastname) user.fullname.lastname = lastname;
  if (email) user.email = email;
  if (profileImage) user.profileImage = profileImage;

  await user.save();
  return user;
};