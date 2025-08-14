import dotenv from 'dotenv';
import app from './index.js';

dotenv.config();

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
    
})
