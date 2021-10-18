import IProvider from '../interfaces/provider';
import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';

const ProviderSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IProvider>('provider', ProviderSchema);
