import { Client } from '../models/client.js';
import { Session } from '../models/session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../services/auth.js';

export const registerClient = async (req, res) => {
  const { email, password } = req.body;

  const existingClient = await Client.findOne({ email: email });

  if (existingClient) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newClient = await Client.create({ email, password: hashedPassword });

  const newSession = await createSession(newClient._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newClient);
};

export const loginClient = async (req, res) => {
  const { email, password } = req.body;

  const existingClient = await Client.findOne({ email: email });

  if (!existingClient) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(
    password,
    existingClient.password,
  );

  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ clientId: existingClient._id });

  const newSession = await createSession(existingClient._id);

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
