const successResponse = (res, data = null, message = 'Success', status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, message = 'Error', status = 500, error = null) => {
    return res.status(status).json({
        success: false,
        message,
        error
    });
};

const authResponse = (res, user, token) => {
    return successResponse(res, {
        token,
        user: {
            email: user.email
        }
    }, 'Login successful');
};

module.exports = {
    successResponse,
    errorResponse,
    authResponse
};