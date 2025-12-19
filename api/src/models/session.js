import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    business: { type: Schema.Types.ObjectId, ref: 'Business' },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('Session', sessionSchema);
