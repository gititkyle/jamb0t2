import mongoose from 'mongoose';

const user = process.env.JAMBOT2_MONGO_USER;
const pass = process.env.JAMBOT2_MONGO_PASS;
const db   = process.env.JAMBOT2_MONGO_DB;
const port = process.env.JAMBOT2_MONGO_PORT;
const url  = `mongodb://${user}:${pass}@mongo:${port}/${db}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export default () => mongoose.connect(url, options);
