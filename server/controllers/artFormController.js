const { sequelize, ArtForm } = require("./../models");
const { State } = require("./../models");
const catchAsync = require("./../utils/catchAsync");

exports.getAllArtForms = catchAsync(async (req, res) => {
  const art = await ArtForm.findAll({
    // order: [["Art_Form", "ASC"]],
    include: [
      {
        model: State,
        as: "state",
        attributes: ["State_Name"],
      },
    ],
  });
  // res.json(art);
  res.status(200).json({
    status: "success",
    results: art.length,
    data: art,
  });
});

exports.getArtForm = catchAsync(async (req, res) => {
  const art = await ArtForm.findOne({
    where: { Art_Form_ID: req.params.id },
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
      data: art,
    },
  });
});

exports.createArtForm = catchAsync(async (req, res) => {
  const art = await ArtForm.create(req.body);
  res.status(201).json({
    status: "success",
    data: art,
  });
});

exports.deleteArtForm = catchAsync(async (req, res) => {
  const art = ArtForm.destroy({
    where: { Art_Form_ID: req.params.id },
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateArtForm = catchAsync(async (req, res) => {
  const doc = await ArtForm.update(req.body, {
    where: { Art_Form_ID: req.params.id },
  });
  const art = await ArtForm.findOne({
    where: { Art_Form_ID: req.params.id },
  });
  res.status(200).json({
    status: "success",
    data: art,
  });
});
