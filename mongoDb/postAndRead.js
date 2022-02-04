const mongoose = require('mongoose');
require('dotenv').config();


const nameSchema = new mongoose.Schema({
    "username": String,
    "count": { type: Number, default: 0 },
    "log": [{
        "description": String,
        "duration": Number,
        "date": { type: Date, default: Date.now },
        _id: false,
    }]
});
const Exercise = mongoose.model("exercises", nameSchema);
mongoose.connect(process.env.API_KEY);


module.exports.addNewUser = async function addNewUser({ username }) {
    if (username) {

        // console.log(mongoose.connection.readyState);
        // mongoose.connection.close();
        // await mongoose.connect(process.env.API_KEY);
        // const NewName = mongoose.model("exercises", nameSchema);

        let addName = new Exercise({ "username": username });

        addName.save(function (err, res) {
            if (err) {
                console.log('Here is the error: ', err);
            }
        })
        addName = {
            username: addName.username,
            _id: addName._id,
        }
        return addName;
    }
    else { return "Error" }

}


module.exports.findAllUsers = async function findAllUsers() {
    
    // console.log(mongoose.connection.readyState);
    // mongoose.connection.close();
    // await mongoose.connect(process.env.API_KEY);
    // const FindName = mongoose.model("exercises", nameSchema);

    return await Exercise.find({}, 'username __v').exec();

}


module.exports.addNewExercise = async function addNewExercise({ _id, description, duration, date }) {

    // console.log(mongoose.connection.readyState);
    // mongoose.connection.close();
    // await mongoose.connect(process.env.API_KEY);

    const objExercise = { "description": description, "duration": duration, "date": date };
    return await Exercise.findByIdAndUpdate(_id, { $inc: { 'count': 1 }, $push: { "log": objExercise } }, { new: true }).select("_id username log.date log.duration log.description count").exec();

}

module.exports.findUserData = async function findUserData({ _id, from = "1980-12-12", to = "2090-12-12" }) {
    // console.log(mongoose.connection.readyState);
    // mongoose.connection.close();
    // await mongoose.connect(process.env.API_KEY);
    from = new Date(from);
    to = new Date(to);
    return await Exercise.find({ "_id": _id, "log.date": { "$gte": from, "$lte": to } }).select("_id username count log.date log.duration log.description").limit(1).exec(); 

}



