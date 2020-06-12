const router = require("express").Router();
const Users = require("./users-model")

router.get("/", (req, res) => {
    const { department } = req.decodedToken;
    Users.findByDepartment(department)
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(404).json({ errorMessage: "No users found", err });
        })
})

module.exports = router;