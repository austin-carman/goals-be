const router = require("express").Router();
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("../utils/token-builder");
const { validateBody, checkUsernameExists } = require("../middleware/auth-middleware");

// needs formatting -> check why formatting files are not working
// logic here should be in middleware
router.post("/login", validateBody, checkUsernameExists, (req, res, next) => { 
    const currentUser = req.user;
    res.json(currentUser.first_name);
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
