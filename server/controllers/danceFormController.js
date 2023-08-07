const { sequelize, DanceForm } = require("./../models");
const { State } = require("./../models");
const catchAsync = require("./../utils/catchAsync");

exports.getAllDanceForms = catchAsync(async (req, res) => {
  const dance = await DanceForm.findAll({
    // order: [["Dance_Form", "ASC"]],
    include: [
      {
        model: State,
        as: "state",
        attributes: ["State_Name"],
      },
    ],
  });
  // res.json(dance);
  res.status(200).json({
    status: "success",
    results: dance.length,
    data: dance,
  });
});

exports.getDanceForm = catchAsync(async (req, res) => {
  const dance = await DanceForm.findOne({
    where: { Dance_ID: req.params.id },
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
      data: dance,
    },
  });
});

exports.createDanceForm = catchAsync(async (req, res) => {
  const dance = await DanceForm.create(req.body);
  res.status(201).json({
    status: "success",
    data: dance,
  });
});

exports.deleteDanceForm = catchAsync(async (req, res) => {
  const dance = DanceForm.destroy({
    where: { Dance_ID: req.params.id },
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateDanceForm = catchAsync(async (req, res) => {
  const doc = await DanceForm.update(req.body, {
    where: { Dance_ID: req.params.id },
  });
  const dance = await DanceForm.findOne({
    where: { Dance_ID: req.params.id },
  });
  res.status(200).json({
    status: "success",
    data: dance,
  });
});
