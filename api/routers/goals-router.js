const router = require("express").Router();
const Goals = require("../models/goals-model");

router.get("/", (req, res, next) => {
  res.json("wired");
});