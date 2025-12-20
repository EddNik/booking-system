import { Appointment } from '../models/appointment.js';
import createHttpError from 'http-errors';

export const bookAppointment = async (req, res) => {
  const { clientId, businessId, date, time } = req.body;
  const existAppointment = await Appointment.findOne({
    businessId,
    date,
    time,
    state: 'booked',
  });
  if (existAppointment) {
    return res
      .status(400)
      .json({ message: 'The time slot is already booked.' });
  }

  const newAppointment = await Appointment.create({
    clientId,
    businessId,
    date,
    time,
    state: 'booked',
  });

  const bookedAppointment = await Appointment.findById(newAppointment._id)
    .populate({ path: 'businessId', select: 'name email' })
    .populate({ path: 'clientId', select: 'name email' });

  res.status(201).json(bookedAppointment);
};

export const getAvailableAppointments = async (req, res) => {
  const { businessId, date } = req.query;

  if (!businessId || !date) {
    return res.status(400).json({
      message: 'Not found businessId or date',
    });
  }

  const availableAppointments = await Appointment.find({
    businessId,
    date,
    state: 'available',
  });

  const availableTime = availableAppointments.map((appoint) => appoint.time);

  res.status(200).json(availableTime);
};

export const getClientAppointments = async (req, res) => {
  const { state = 'available', page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  const query = { clientId: req.user._id, state };

  const [totalAppointments, appointments] = await Promise.all([
    Appointment.countDocuments(query),
    Appointment.find(query)
      .populate({ path: 'businessId', select: 'name email' })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalAppointments / perPage);

  res.status(200).json({
    page: page,
    perPage: perPage,
    totalAppointments,
    totalPages,
    appointments,
  });
};

export const getBusinessAppointments = async (req, res) => {
  const { state = 'booked', page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  const query = { businessId: req.user._id, state };

  const [totalAppointments, appointments] = await Promise.all([
    Appointment.countDocuments(query),
    Appointment.find(query)
      .populate({ path: 'clientId', select: 'name email' })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalAppointments / perPage);

  res.status(200).json({
    page: page,
    perPage: perPage,
    totalAppointments,
    totalPages,
    appointments,
  });
};

export const rejectAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  const appointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { state: 'available' },
    { new: true },
  );

  if (!appointment) {
    throw createHttpError(404, 'Appointment not found');
  }

  res.status(200).json(appointment);
};
