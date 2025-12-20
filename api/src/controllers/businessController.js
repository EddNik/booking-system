import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Business } from '../models/business.js';
import { Session } from '../models/session.js';
import { Appointment } from '../models/appointment.js';

export const registerBusiness = async (req, res) => {
  const { name, email, password } = req.body;

  const existingBusiness = await Business.findOne({ email });

  if (existingBusiness) {
    throw createHttpError(400, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newBusiness = await Business.create({
    name,
    email,
    password: hashPassword,
  });

  const newSession = await createSession({ businessId: newBusiness._id });

  setSessionCookies(res, newSession);
  res.status(201).json(newBusiness);
};

export const loginBusiness = async (req, res) => {
  const { email, password } = req.body;

  const existingBusiness = await Business.findOne({ email });

  if (!existingBusiness) {
    throw createHttpError(401, `There is no user with email: ${email}`);
  }

  const validPassword = await bcrypt.compare(
    password,
    existingBusiness.password,
  );

  if (!validPassword) {
    throw createHttpError(401, 'Password is wrong');
  }

  await Session.deleteOne({ business: existingBusiness._id });
  const newSession = await createSession({ businessId: existingBusiness._id });

  setSessionCookies(res, newSession);
  res.status(200).json(existingBusiness);
};

export const logoutBusiness = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshBusinessSession = async (req, res) => {
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  const newSession = await createSession({ businessId: session.business });
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};

export const getAllBusinesses = async (req, res) => {
  const { search, page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  const businessQuery = Business.find();

  if (search) {
    businessQuery.where({ $text: { $search: search } });
  }

  const [totalBusinesses, businesses] = await Promise.all([
    businessQuery.clone().countDocuments(),
    businessQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalBusinesses / perPage);

  res
    .status(200)
    .json({ page, perPage, totalBusinesses, totalPages, businesses });
};

export const deleteBusiness = async (req, res) => {
  const { email } = req.body;

  const existingBusiness = await Business.findOneAndDelete({ email });

  if (!existingBusiness) {
    throw createHttpError(404, 'Business not found');
  }

  await Appointment.updateMany(
    { businessId: existingBusiness._id, state: 'booked' },
    { state: 'available' },
  );

  res.status(204).send();
};
