const { User } = require("./../models");
const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");

exports.getAllUsers = async (req, res) => {
  const user = await User.findAll();
  // res.status(200).json({
  //   status: "success",
  //   results: user.length,
  //   message: user,
  // });
  res.json(user);
};

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findOne({
    where: { userName: req.params.name, password: req.params.password },
  });
  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = User.destroy({
    where: { userName: req.params.name, password: req.params.password },
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const doc = await User.update(req.body, {
    where: { userName: req.params.name, password: req.params.password },
  });
  const user = await User.findOne({
    where: { userName: req.params.name, password: req.params.password },
  });
  res.status(200).json({
    status: "success",
    data: user,
  });
});
