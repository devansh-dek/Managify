const UserServices = require("../services/user-service");

const userService = new UserServices();

async function signup(req, res) {
    try {
        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        const data = await userService.signup(userData);
        return res.status(201).json({
            data: data,
            success: true,
            message: 'Successfully signed up',
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to sign up',
            error: error
        });
    }
}

async function login(req, res) {
    try {
        const loginData = {
            email: req.body.email,
            password: req.body.password
        };
        const data = await userService.login(loginData);
        return res.status(200).json({
            data: data,
            success: true,
            message: 'Successfully logged in',
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to login',
            error: error
        });
    }
}

async function authenticate(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = await userService.authenticate(token);
        return res.status(200).json({
            data: data,
            success: true,
            message: 'Authenticated successfully',
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unauthorized',
            error: error
        });
    }
}


module.exports = {
    signup,
    login,
    authenticate
}