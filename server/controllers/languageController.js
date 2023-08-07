const { sequelize, Language } = require("./../models");
const { State } = require("./../models");
const catchAsync = require("./../utils/catchAsync");

exports.getAllLanguages = catchAsync(async (req, res) => {
  const lang = await Language.findAll({
    // order: [["Language_Name", "ASC"]],
    include: [
      {
        model: State,
        as: "state",
        attributes: ["State_Name"],
      },
    ],
  });
  // res.json(lang);
  res.status(200).json({
    status: "success",
    results: lang.length,
    data: lang,
  });
});

exports.getLanguage = catchAsync(async (req, res) => {
  const lang = await Language.findOne({
    where: { Language_ID: req.params.id },
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
      data: lang,
    },
  });
});

exports.createLanguage = catchAsync(async (req, res) => {
  const lang = await Language.create(req.body);
  res.status(201).json({
    status: "success",
    data: lang,
  });
});

exports.deleteLanguage = catchAsync(async (req, res) => {
  const lang = Language.destroy({
    where: { Language_ID: req.params.id },
  });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateLanguage = catchAsync(async (req, res) => {
  const doc = await Language.update(req.body, {
    where: { Language_ID: req.params.id },
  });
  const lang = await Language.findOne({
    where: { Language_ID: req.params.id },
  });
  res.status(200).json({
    status: "success",
    data: lang,
  });
});

exports.topSpoken = catchAsync(async (req, res) => {
  const top = parseInt(req.query.top) || 10;
  try {
    const topLanguages = await Language.findAll({
      order: [["Percentage", "DESC"]],
      limit: top,
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
      results: topLanguages.length,
      data: topLanguages,
    });
  } catch (error) {
    console.error("Error executing the query:", error);
  }
});

exports.leastSpoken = catchAsync(async (req, res) => {
  const least = parseInt(req.query.least) || 10;
  try {
    const topLanguages = await Language.findAll({
      order: [["Percentage", "ASC"]],
      limit: least,
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
      results: topLanguages.length,
      data: topLanguages,
    });
  } catch (error) {
    console.error("Error executing the query:", error);
  }
});
