import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./src/utils/MongoDb.js";

const app = express();

// Middleware
app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
   'https://uddyan.com',
   'https://www.uddyan.com',
 
];
// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

// Import routes
import uploadRoutes from "./routes/uploadRoutes.js";
import categoryRoutes from "./src/routes/category.route.js";
import productRoutes from "./src/routes/product.route.js";
import authRoutes from "./src/routes/auth.route.js";
import orderRoutes from "./src/routes/order.route.js";
import paymentRoutes from "./src/routes/payment.route.js";
import cartRoutes from "./src/routes/cart.route.js";

// Mount routes
app.use("/api/upload", uploadRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);

dbConnect();

app.get("/", (req, res) => {
  res.send("The api is running");
});

// MongoDB connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
