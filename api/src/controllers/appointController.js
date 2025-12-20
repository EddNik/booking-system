import { Appointment } from '../models/appointment.js';
import createHttpError from 'http-errors';

export const bookAppointment = async (req, res) => {
  const { clientId, businessId, date, time, email, name } = req.body;
  console.log(req.client);
  const existAppointment = await Appointment.findOne({
    businessId,
    date,
    time,
    status: { $ne: 'cancelled' },
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
    email,
    name,
  });
  res.status(201).json(newAppointment);
};

export const getAvailableAppointments = async (req, res) => {
  const { businessId, date } = req.query;

  const bookedAppointments = Appointment.find({
    businessId,
    date,
    state: 'booked',
  });
  res.status(200).json(bookedAppointments);
};

export const cancelAppointment = async (req, res) => {
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
