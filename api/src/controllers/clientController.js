import { Client } from '../models/client.js';
import { Session } from '../models/session.js';
import { Appointment } from '../models/appointment.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../services/auth.js';

export const registerClient = async (req, res) => {
  const { email, password, name } = req.body;

  const existingClient = await Client.findOne({ email });

  if (existingClient) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newClient = await Client.create({
    email,
    password: hashedPassword,
    name: name || email,
  });

  const newSession = await createSession({ clientId: newClient._id });

  setSessionCookies(res, newSession);

  res.status(201).json(newClient);
};

export const loginClient = async (req, res) => {
  const { email, password } = req.body;

  const existingClient = await Client.findOne({ email });

  if (!existingClient) {
    throw createHttpError(401, `There is no client with email: ${email}`);
  }

  const validPassword = await bcrypt.compare(password, existingClient.password);

  if (!validPassword) {
    throw createHttpError(401, 'Password is wrong');
  }

  await Session.deleteOne({ client: existingClient._id });

  const newSession = await createSession({ clientId: existingClient._id });

  setSessionCookies(res, newSession);

  res.status(200).json(existingClient);
};

export const logoutClient = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshClientSession = async (req, res) => {
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

  const newSession = await createSession({ clientId: session.client });
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};

export const deleteClient = async (req, res) => {
  const { email } = req.body;

  const existingClient = await Client.findOneAndDelete({ email });

  if (!existingClient) {
    throw createHttpError(404, 'Client not found');
  }

  await Appointment.updateMany(
    { clientId: existingClient._id, state: 'booked' },
    { state: 'available' },
  );

  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
