const { User } = require("./../models");
const catchAsync = require("./../utils/catchAsync");
const { error } = require("console");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists
  if (!email || !password) {
    error("Please provide email and password!", 400);
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  console.log(password);
  if (!user || !(user.password === password)) {
    error("Incorrect email or password", 401);
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});
