export const EXPRESS_SERVER_FILE_CODE = `
import mongoose from 'mongoose';
import app from "./app";

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test_db';

mongoose.connect(MONGO_URI).then(() => {
    console.log("Mongoose Connected");
    app.listen(PORT, () => {
        console.log(\`Server Running on PORT \${PORT}\`);
    });
}).catch(err => {
    console.log(err, "Error While connecting to MongoDB");
});
`;

export const EXPRESS_APP_FILE_CODE =  `
import express from "express";

const app = express();

app.use(express.json());

export default app;
`
