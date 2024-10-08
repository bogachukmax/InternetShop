import { Schema, model, Document } from 'mongoose';

// Интерфейс для товара (для типизации TypeScript)
interface IProduct extends Document {
    name: string;
    price: string;
    description: string;
    img: string;
    amount: number;
    comments: Array<{
        name: string;
        text: string;
    }>;
}

// Схема для товара
const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    amount: { type: Number, default: 1 },
    comments: [
        {
            name: { type: String },
            text: { type: String }
        }
    ]
});

// Создание модели
const Product = model<IProduct>('Product', productSchema);
export default Product;
