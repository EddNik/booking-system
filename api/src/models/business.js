import { model, Schema } from 'mongoose';

const businessSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      // required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

businessSchema.pre('save', function () {
  if (!this.name) {
    this.name = this.email;
  }
});

businessSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const Business = model('Business', businessSchema);
