import mongoose from 'mongoose'
const URI = 'mongodb://127.0.0.1/solutoria';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))

export default mongoose