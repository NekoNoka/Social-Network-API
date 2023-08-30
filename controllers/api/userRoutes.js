const router = require("express").Router();
const { User } = require("../../models/index");

router.get("/", async (req, res) => {
    console.log("get all users request");
    try {
        let users = await User.find({});
        console.log(users);
        res.send(users);
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.get("/:userId", async (req, res) => {
    console.log("get single user request");
    try {
        let user = await User.findById(
            { _id: req.params.userId }
        );
        console.log(user);
        res.send(user);
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    console.log("create user request");
    try {
        let user = await User.create(req.body);
        console.log(user);
        res.send(user);
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.put("/:userId", async (req, res) => {
    console.log("update user request");
    try {
        let user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        );
        console.log(user);
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.delete("/:userId", async (req, res) => {
    console.log("delete user request");
    try {
        await User.findByIdAndDelete(
            { _id: req.params.userId }
        );
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

module.exports = router;
