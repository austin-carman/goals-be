const router = require("express").Router();
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("../utils/token-builder");

router.post("/login", (req, res, next) => { // logic here should be in middleware
    res.json("/login is wired")
});

router.get("/", (req, res, next) => {
    const filter = { user_id: 1 };
    User.findUserBy(filter)
        .then(currentUser => {
            res.status(200).json({currentUser})

        })
        .catch(err => console.log("error: ", err));
})

module.exports = router
