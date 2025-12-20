import { model, Schema } from 'mongoose';

const clientSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

clientSchema.pre('save', function () {
  if (!this.name) {
    this.name = this.email;
  }
});

clientSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const Client = model('Client', clientSchema);
