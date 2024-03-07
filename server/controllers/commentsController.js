const { sequelize, Comments } = require("../models");
const { ArtForm } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res) => {
  const comment = await Comments.findAll({
    // include: [
    //   {
    //     model: ArtForm,
    //     as: "comment",
    //     attributes: ["Art_Form"],
    //   },
    // ],
  });
  // res.json(art);
  res.status(200).json({
    status: "success",
    results: comment.length,
    data: comment,
  });
});

exports.getComment = catchAsync(async (req, res) => {
  const comment = await Comments.findAll({
    where: { Comment_ID: req.params.id },
  });
  res.status(200).json({
    status: "success",
    data: {
      data: comment,
    },
  });
});

exports.createComment = catchAsync(async (req, res) => {
  const comment = await Comments.create(req.body);
  res.status(201).json({
    status: "success",
    data: comment,
  });
});

exports.deleteComment = catchAsync(async (req, res) => {
  const comment = Comments.destroy({
    where: { Comment_ID: req.params.id },
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateComment = catchAsync(async (req, res) => {
  const doc = await Comments.update(req.body, {
    where: { Comment_ID: req.params.id },
  });
  const comment = await Comments.findOne({
    where: { Comment_ID: req.params.id },
  });
  res.status(200).json({
    status: "success",
    data: comment,
  });
});
