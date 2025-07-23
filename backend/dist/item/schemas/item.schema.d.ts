import { Document, Types } from 'mongoose';
export type ItemDocument = Item & Document;
export declare class Item {
    level: number;
    title: string;
    description: string;
    percentage: number;
    name: string;
    userId: Types.ObjectId;
}
export declare const ItemSchema: import("mongoose").Schema<Item, import("mongoose").Model<Item, any, any, any, Document<unknown, any, Item, any> & Item & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Item, Document<unknown, {}, import("mongoose").FlatRecord<Item>, {}> & import("mongoose").FlatRecord<Item> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
