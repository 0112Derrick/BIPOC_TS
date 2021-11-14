 const HTML_IDS = {

  MAIN_PAGE_LOGOUT_BUTTON      : 'main-page-logout-button',
  MAIN_PAGE_PROFILE_BUTTON     : 'main-page-profile-button',
  MAIN_PAGE_PROFILE_CONTAINER  : 'main-page-profile-container',
  MAIN_PAGE_OVERVIEW_BUTTON    : 'main-page-summary-button',
  MAIN_PAGE_OVERVIEW_CONTAINER : 'main-page-summary-container',

  PROFILE_DATE_OF_BIRTH_INPUT : 'profile-main-form',
  PROFILE_BIO_INPUT           : 'profile-bio-input',
  PROFILE_ADDRESS_INPUT       : 'profile-address-input',
  PROFILE_CITY_INPUT          : 'profile-city-input',
  PROFILE_COUNTRY_INPUT       : 'profile-country-input',
  PROFILE_EMAIL_INPUT         : 'profile-email-input',
  PROFILE_FIRST_NAME_INPUT    : 'profile-first-name-input',
  PROFILE_LAST_NAME_INPUT     : 'profile-last-name-input',
  PROFILE_MAIN_FORM           : 'profile-main-form',
  PROFILE_ZIPCODE_INPUT       : 'profile-zipcode-input',
  PROFILE_SAVE_INPUT          : 'profile-save-button',
  PROFILE_USERNAME_INPUT      : 'profile-username-input',
}

 const LANDING_HTML_IDS = {
   LOGIN_MODAL            : 'login-modal',
   LOGIN_FORM             : 'login-form',
   FLASH_MESSAGE          : 'flash-message',
   LOGIN_OK               : 'login-ok',
   LOGIN_CANCEL           : 'login-cancel',
   MEMBER_SIGNUP_EMAIL    : 'member-signup-email',
   MEMBER_SIGNUP_PASSWORD : 'member-signup-password',
   MEMBER_SIGNUP_USERNAME : 'member-signup-username',
}

for (let prop in HTML_IDS)
  Object.defineProperty(HTML_IDS, prop, { configurable: false, writable: false })

for (let prop in LANDING_HTML_IDS)
  Object.defineProperty(LANDING_HTML_IDS, prop, { configurable: false, writable: false })

export { HTML_IDS , LANDING_HTML_IDS};