const User = require("../models/user-model");

const validateBody = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next({
            status: 400,
            message: 'Username and password are required'
        })
    } else {
        next()
    }
}

const checkUsernameExists = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.findUserBy({username})
        if (!user) { // is ! really the best way to check???
            res.json({
                status: 401,
                message: "Invalid username or password"
            })
        } else {
            req.user = user
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    validateBody,
    checkUsernameExists,
}