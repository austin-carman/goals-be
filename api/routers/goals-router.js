const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("wired");
});

module.exports = router;