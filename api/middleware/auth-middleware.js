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

module.exports = {
    validateBody
}