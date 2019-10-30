const express = require('express');
const router = express.Router();
const db = require('./userDb');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    db.getById(id)
    .then(user => {
        if(user) {
            next();
        } else {
            res.status(404).json({ message: "invalid user id" });
        }
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(400).json({ message: "getById failed." });
    })
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
