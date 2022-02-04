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
    return await Exercise.find({}, 'username __v').exec();
}


module.exports.addNewExercise = async function addNewExercise({ _id, description, duration, date }) {
    const objExercise = { "description": description, "duration": duration, "date": date };
    return await Exercise.findByIdAndUpdate(_id, { $inc: { 'count': 1 }, $push: { "log": objExercise } }, { new: true }).select("_id username log.date log.duration log.description count").exec();
}

module.exports.findUserData = async function findUserData({ _id, from = "1980-12-12", to = "2090-12-12" }) {
    from = new Date(from);
    to = new Date(to);
    return await Exercise.find({ "_id": _id, "log.date": { "$gte": from, "$lte": to } }).select("_id username count log.date log.duration log.description").limit(1).exec();

}



