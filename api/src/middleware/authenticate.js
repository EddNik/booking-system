import createHttpError from 'http-errors';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  const session = await Session.findOne({
    accessToken: req.cookies.accessToken,
  }).populate('client business');

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const nowDate = new Date();
  const accessTokenExpired = nowDate > new Date(session.accessTokenValidUntil);

  if (accessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = session.client || session.business;

  if (!user) {
    throw createHttpError(401);
  }

  req.user = user;
  req.userType = session.userType;
  next();
};
