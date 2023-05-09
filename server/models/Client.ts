import { model, Schema } from 'mongoose';

export interface Client {
  name: string;
  email: string;
  phone: string;
}

const ClientSchema = new Schema<Client>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export const ClientModel = model<Client>('Client', ClientSchema);
