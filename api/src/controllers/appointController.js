import { Appointment } from '../models/appointment.js';

export const bookAppointment = async (req, res) => {
  const { clientId, businessId, date, time } = req.params;
  const existAppointment = await Appointment.findOne({
    businessId,
    date,
    time,
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
  });
  res.status(201).json(newAppointment);
};

export const getAppointments = async (req, res) => {
  const appointments = Appointment.find({ clientId: req.clients._id });
  res.json(appointments);
};
