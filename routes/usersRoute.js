const express = require('express');
const router = express.Router();

const { createNewUser, createNewExercise
} = require('../controller/addUserData');

const { getAllUsers, getExerciseForUser
} = require('../controller/getUserData');

router.post('/', createNewUser);

router.get('/', getAllUsers);

router.post('/:_id/exercises', createNewExercise);

router.get('/:_id/logs', getExerciseForUser);

module.exports = router;