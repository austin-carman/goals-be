const router = require("express").Router();
const User = require("../models/user-model");

router.get("/", (req, res, next) => {
    const filter = { user_id: 1 };
    User.findUserBy(filter)
        .then(currentUser => {
            res.status(200).json({currentUser})

        })
        .catch(err => console.log("error: ", err));
})

module.exports = router
