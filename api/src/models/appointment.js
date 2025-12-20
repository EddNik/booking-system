import { model, Schema } from 'mongoose';
import { BOOK_HOURS } from '../constants/bookHours.js';

const appointmentSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: false, required: false, trim: true },
    password: { type: String, required: false },
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
    },
    time: {
      type: String,
      required: true,
      enum: BOOK_HOURS,
    },
    state: { type: String, enum: ['booked', 'available'], default: 'booked' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

appointmentSchema.index({ businessId: 1, state: 1 });
appointmentSchema.index({ clientId: 1, state: 1 });

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
