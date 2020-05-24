import mongoose from 'mongoose';

const user = process.env.JAMBOT2_MONGO_USER;
const pass = process.env.JAMBOT2_MONGO_PASS;
const url = `mongodb://${user}:${pass}@mongo:27017/jamb0t2`;
const options = {
    useNewUrlParser: true,
    authSource: 'jamb0t2'
};

export default () => mongoose.connect(url, options);
