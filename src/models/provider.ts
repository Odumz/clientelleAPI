import IProvider from '../interfaces/provider';
import { Schema } from 'mongoose';
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

export default mongoose.model<IProvider>('provider', ProviderSchema);
