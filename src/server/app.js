import dotenv from 'dotenv';
import app from './index.js';
import connectDB from './db.js';

dotenv.config();

connectDB();

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
    
})
