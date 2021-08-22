//Events constants that can't be touched.
var EventConstants;
(function (EventConstants) {
    EventConstants["SIGN_UP_HOME"] = "_sign-up-modal";
    EventConstants["SIGN_IN_MODAL"] = "_sign-in-modal";
    EventConstants["SIGN_IN"] = "_sign-in";
    EventConstants["SIGN_OUT"] = "_sign-out";
})(EventConstants || (EventConstants = {}));
//Events constants that can't be touched.
var LoginStatusConstants;
(function (LoginStatusConstants) {
    LoginStatusConstants[LoginStatusConstants["LOGIN_CLIENT_ERROR_BASE"] = 400] = "LOGIN_CLIENT_ERROR_BASE";
    LoginStatusConstants[LoginStatusConstants["LOGIN_SERVER_ERROR_BASE"] = 500] = "LOGIN_SERVER_ERROR_BASE";
    LoginStatusConstants[LoginStatusConstants["LOGIN_USER_NOT_FOUND"] = 401] = "LOGIN_USER_NOT_FOUND";
    LoginStatusConstants[LoginStatusConstants["LOGIN_INVALID_PASSWORD"] = 402] = "LOGIN_INVALID_PASSWORD";
})(LoginStatusConstants || (LoginStatusConstants = {}));
export { EventConstants, LoginStatusConstants };
