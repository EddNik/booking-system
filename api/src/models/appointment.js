import { model, Schema } from 'mongoose';
import { BOOK_HOURS } from '../constants/bookHours.js';

const appointmentSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    date: {
      type: String,
      required: true,
      message: 'Date must be in format YYYY-MM-DD',
    },
    time: {
      type: String,
      required: true,
      enum: BOOK_HOURS,
    },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

appointmentSchema.index({ businessId: 1, date: 1, time: 1 });
appointmentSchema.index({ clientId: 1, status: 1 });

appointmentSchema.pre('save', function () {
  if (!this.name) {
    this.name = this.email;
  }
});

appointmentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const Appointment = model('Appointment', appointmentSchema);
