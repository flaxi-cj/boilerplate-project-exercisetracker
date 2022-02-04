const { addNewExercise } = require("../mongoDb/postAndRead");
const { addNewUser } = require("../mongoDb/postAndRead");
const {findUserData} = require("../mongoDb/postAndRead")

const createNewUser = async (req, res) => {
    let { username } = req.body;
    const user = {
        username: username
    }
    const answer = await addNewUser(user).catch(err => console.log(err));
    return res.status(200).json(answer);
};
const createNewExercise = async (req, res) => {

    let answer = await findUserData(req.params).catch(err => console.log("There is a really long error at line 16 in getUserData"))
    if (answer == undefined) { console.log("Entered undefined here"); return res.status(200).json({ "Error": "No such user" }) };
    const newExerciseDetails = {
        ...req.params,
        ...req.body,
    }
    answer = await addNewExercise(newExerciseDetails).catch(err => console.log(err));
    const output = {
        "_id": answer._id,
        "username": answer.username,
        "date": new Date(answer.log[answer.count - 1].date).toDateString(),
        "duration": answer.log[answer.count - 1].duration,
        "description": answer.log[answer.count - 1].description,
    }
    return res.status(200).json(output);
};

module.exports = {
    createNewUser,
    createNewExercise,
}