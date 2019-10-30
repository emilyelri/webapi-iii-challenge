const express = require('express');
const router = express.Router();
const db = require('./userDb');

router.post('/', validateUser, (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: insert failed"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

});

router.get('/', (req, res) => {
    db.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: get failed"});
    })
});

router.get('/:id', validateUserId, (req, res) => {

});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    db.getById(id)
    .then(user => {
        if (user) {
            req.body = id;
            next();
        } else {
            res.status(404).json({ message: "invalid user id" });
        }
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: getById failed" });
    })
};

function validateUser(req, res, next) {
    !req.body && res.status(400).json({ message: "missing user data" });
    !req.body.name && res.status(400).json({ message: "missing required name field" });
    next();
};

function validatePost(req, res, next) {
    !req.body && res.status(400).json({ message: "missing post data" });
    !req.body.text && res.status(400).json({ message: "missing required text field" });
    next();
};

module.exports = router;
