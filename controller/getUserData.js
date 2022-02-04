const { findAllUsers, findUserData } = require("../mongoDb/postAndRead");

const getAllUsers = async (req, res) => {

    const answer = await findAllUsers().catch(err => console.log(err));
    return res.status(200).json(answer);
}

const getExerciseForUser = async (req, res) => {
    const { limit = 0 } = req.query;
    let userId = {
        ...req.params,
        ...req.query
    }

    let answer = await findUserData(userId).catch(err => console.log("There is a really long error at line 16 in getUserData"))

    if (answer == undefined) { console.log("Entered undefined here"); return res.status(200).json({ "Error": "No such user" }) };

    // answer = await answer[0];
    // console.log(answer.length)

    if (answer.length == 0) {
        // console.log("entered empty here")
        userId = {
            ...req.params,
        }

        answer = await findUserData(userId).catch(err => console.log(err))
        answer = await answer[0];

        answer = {
            "_id": answer._id,
            "username": answer.username,
            "count": 0,
            "log": []
        }
        if (req.query.from) { answer = { ...answer, "from": req.query.from } };
        if (req.query.to) { answer = { ...answer, "to": req.query.to } };

        return res.status(200).json(answer);
    }
    // TODO:CHANGE THE BELOW ACTION. find a way to change data with filter or for map to not display empty values
    else {
        answer = await answer[0];
        answer = {
            "_id": answer._id,
            "username": answer.username,
            "count": answer.count,
            "log":
                answer.log.map((element) => {
                    return {
                        "description": element.description,
                        "duration": element.duration,
                        "date": new Date(element.date).toDateString(),
                    }
                })
        }
        const output = {
            "_id": answer._id,
            "username": answer.username,
            "count": answer.count,
            "log":
                answer.log.filter((element, index) => {
                    if (index < limit || limit == 0) {
                        return {
                            "description": element.description,
                            "duration": element.duration,
                            "date": element.date,
                        }
                    }
                })
        }



        return res.status(200).json(output);
    }
}

module.exports = {
    getAllUsers,
    getExerciseForUser,
}




