require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
// const cors = require('cors');

const app = express();

app.use(express.json());


// Then pass them to cors:
// app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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

const PORT = process.env.POST || 5000;

app.listen(PORT, () => console.log(`Server started on port :  ${PORT}`));