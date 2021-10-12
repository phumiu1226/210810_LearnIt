require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const cors = require('cors');

const app = express();

app.use(express.json());


// Then pass them to cors:
app.use(cors());


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learnit.tbclf.mongodb.net/learnit?retryWrites=true&w=majority`,
            {
                // useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useFindAndModify: false,
            }
        );
        console.log(`MongoDB connected`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port :  ${PORT}`));