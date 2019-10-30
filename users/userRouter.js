const express = require('express');
const router = express.Router();
const userDB = require('./userDb');
const postDB = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
    const newUser = req.body;
    userDB.insert(newUser)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: user insert failed"})
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const newPost = {...req.body, user_id: req.params.id};
    postDB.insert(newPost)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: post insert failed" })
    });
});

router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: users get failed"});
    });
});

router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    userDB.getById(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: user getById failed" });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.params.id;
    userDB.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: user getUserPosts failed"});
    });
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    userDB.getById(id)
    .then(user => {
        userDB.remove(id)
        .then(count => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log("Error!", err);
            res.status(500).json({ error: "server error: user remove failed"})
        })
    })
});

router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const newPost = req.body;
    userDB.update(id, newPost)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: user update failed"});
    });
});


//custom middleware
function validateUserId(req, res, next) {
    const id = req.params.id;

    userDB.getById(id)
    .then(user => {
        if (user) {
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