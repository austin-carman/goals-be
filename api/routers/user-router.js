const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json({message: "user router is wired"})
})

module.exports = router