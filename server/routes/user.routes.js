const { registerUser, loginUser, getUser, loginUserInternal, getUserByid, } = require('../controllers/user.controller')


module.exports = (app) => {
    app.get('/api/v1/getuserbyid', getUserByid);

    app.post('/api/v1/registeruser', registerUser);

    app.post('/api/v1/login', loginUser);

    app.post('/api/v1/login/internal', loginUserInternal);

    app.get('/api/v1/user', getUser );
}

