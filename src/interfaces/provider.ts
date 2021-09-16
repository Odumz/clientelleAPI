import { Document } from 'mongoose';

export default interface IProvider extends Document {
    name: string;
}
