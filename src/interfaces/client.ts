import { Document } from 'mongoose';

export default interface IClient extends Document {
    name: string;
    email: string;
    phone: number;
    provider: Array<object>;
}
