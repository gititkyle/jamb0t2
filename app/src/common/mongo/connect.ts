import mongoose    from 'mongoose';

const url = 'mongodb://mongo:27017/jamb0t2';
const options = {
    useNewUrlParser: true
};

export default () => mongoose.connect(url, options);
