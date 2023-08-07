const { sequelize, Food } = require("./../models");
const { State } = require("./../models");
const catchAsync = require("./../utils/catchAsync");

exports.getAllFoods = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || null;
  const food = await Food.findAll({
    // order: [["Food_Name", "ASC"]],
    limit: limit,
    include: [
      {
        model: State,
        as: "state",
        attributes: ["State_Name"],
      },
    ],
  });
  // res.json(food);
  res.status(200).json({
    status: "success",
    results: food.length,
    data: food,
  });
});

exports.getFood = catchAsync(async (req, res) => {
  const food = await Food.findOne({
    where: { Food_ID: req.params.id },
    include: [
      {
        model: State,
        as: "state",
        attributes: ["State_Name"],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      data: food,
    },
  });
});

exports.createFood = catchAsync(async (req, res) => {
  const food = await Food.create(req.body);
  res.status(201).json({
    status: "success",
    data: food,
  });
});

exports.deleteFood = catchAsync(async (req, res) => {
  const food = Food.destroy({
    where: { Food_ID: req.params.id },
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateFood = catchAsync(async (req, res) => {
  const doc = await Food.update(req.body, {
    where: { Food_ID: req.params.id },
  });
  const food = await Food.findOne({
    where: { Food_ID: req.params.id },
  });
  res.status(200).json({
    status: "success",
    data: food,
  });
});
