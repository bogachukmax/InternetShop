import express, { Request, Response } from 'express';
import Product from '../models/Product';


const router = express.Router();

// Получение всех товаров
router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Добавление нового товара
router.post('/', async (req: Request, res: Response) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        img: req.body.img,
        amount: req.body.amount,
        comments: req.body.comments,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Обновление товара
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.img = req.body.img;
        product.amount = req.body.amount;
        product.comments = req.body.comments;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Удаление товара
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;