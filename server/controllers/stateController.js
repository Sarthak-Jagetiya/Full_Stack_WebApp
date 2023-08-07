const { State } = require("./../models");
const catchAsync = require("./../utils/catchAsync");

exports.getAllStates = catchAsync(async (req, res) => {
  const state = await State.findAll({
    order: [["State_Name", "ASC"]],
  });
  // res.json(lang);
  res.status(200).json({
    status: "success",
    results: state.length,
    data: state,
  });
});
