const API = '/api';
const AUTH = API + '/auth';
const SKILL_TRACKER = API + '/skill-tracker';
const ENGINEER = '/engineer';
const ADMIN = '/admin/';

export const AUTH_URLS = {
  LOGIN: `${AUTH}/login`,
  LOGOUT: `${AUTH}/logout`,
  GET_USER_DETAILS: `${AUTH}/userDetails`,
};

export const SKILL_TRACKER_URLS = {
  ADD_PROFILE: `${SKILL_TRACKER}${ENGINEER}/add-profile`,
  UPDATE_PROFILE: `${SKILL_TRACKER}${ENGINEER}/update-profile`,
  GET_PROFILES: `${SKILL_TRACKER}${ADMIN}`,
  GET_PROFILE: `${SKILL_TRACKER}${ENGINEER}/get-profile/`,
  GET_SKILLS: `${SKILL_TRACKER}/skills`,
};