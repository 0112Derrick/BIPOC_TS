//Events constants that can't be touched.
enum EventConstants {
  SIGN_UP_HOME = '_sign-up-modal',
  SIGN_IN_MODAL = '_sign-in-modal',
  SIGN_IN = '_sign-in',
  SIGN_OUT = '_sign-out',
}

//Events constants that can't be touched.
enum LoginStatusConstants {
  LOGIN_CLIENT_ERROR_BASE = 400,
  LOGIN_SERVER_ERROR_BASE = 500,
  LOGIN_USER_NOT_FOUND = LOGIN_CLIENT_ERROR_BASE + 1,
  LOGIN_INVALID_PASSWORD = LOGIN_CLIENT_ERROR_BASE + 2
}
export { EventConstants, LoginStatusConstants };