import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/product.model.js';
import fs from 'fs';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { dbName: 'test' }).then(async () => {
    const prod = await Product.findOne();
    fs.writeFileSync('prod.json', JSON.stringify(prod || {}, null, 2));
    process.exit(0);
}).catch(console.error);
