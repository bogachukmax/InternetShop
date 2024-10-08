import express from "express"
import mongoose from "mongoose"
import router from "./routes/productRoutes"

const app = express()
const PORT = 3000
app.use(express.static("public"))
// const mongoURI = `mongodb+srv://Misha:yhrPOU2LmEzAQYGI@clusterinternetshop.n0r0w.mongodb.net/?retryWrites=true&w=majority&appName=ClusterInternetShop`

// // Подключение к MongoDB
// mongoose.connect(mongoURI)
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch((err) => console.error('Error connecting to MongoDB:', err));


// // Middleware для обработки JSON
// app.use(express.json());

// // Маршруты
// app.use('/products', router);

// // Тестовый маршрут
// // app.get('/', (req: Request, res: Response) => {
// //     res.send('MongoDB connected with TypeScript!');
// // });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})