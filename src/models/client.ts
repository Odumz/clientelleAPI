import IClient from '../interfaces/client';
import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';

const ClientSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        provider: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: 'provider'
        }
    },
    {
        timestamps: true
    }
);

export default model<IClient>('client', ClientSchema);
