const db = require("../database/db-config")

module.exports = {
    find,
    findByUsername,
    findByDepartment,
    add,
}

function find() {
    return db("users");
}

function findByUsername(username) {
    return db("users").where({ username });
}

function findByDepartment(department) {
    return db("users").where({ department });
}

function add(user) {
    return db("users")
        .insert(user)
        .then(([id]) => db("users").where({ id }).first());
}