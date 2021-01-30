const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// once secret file is written we can uncomment the following 
// const secrets = require(".../secrets")
const Users = require("../users/users-model")

router.post("/register", (req, res) => {
    const user = req.body;
    if (user.username && user.password) {
        user.password = bcrypt.hashSync(user.password, 14);

    Users.add(user)
        .then((addedUser) => {
            res.status(201).json(addedUser);
        })
        .catch((err) => {
            res.status(404).json({ errorMessage: "Error adding user", err})
        })
    } else {
        res 
            .status(404)
            .json({ errorMessage: "Username and password is required" });
    }
})


//----------------------------------------------------------------------------//
// When user successfully authenticates, reward with token, 
// so they don't have to authenticate again. 
//----------------------------------------------------------------------------//
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    Users.findByUsername(username).then(([user]) => {
        if (bcrypt.compareSync(password, user.password)) {
            const token = generateToke(user);
            res.status(200).json({ message: `Welcome ${username} !`, token })
        } else {
            res.status(401).json({ errorMessage: "Password is incorrect" });
        }
    })
})

function generateToke(user) {
    const payload = {
        id: user.id,
        username: user.username,
        department: user.department,
    }

    const secret = secrets.JWT_SECRET;

    const options = {
        expressIn: "1d",
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;
