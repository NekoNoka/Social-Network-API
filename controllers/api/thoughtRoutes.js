const router = require("express").Router();
const { Thought, User } = require("../../models/index");

router.get("/", async (req, res) => {
    console.log("get all thoughts request");
    try {
        let thoughts = await Thought.find({});
        console.log(thoughts);
        res.send(thoughts);
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.get("/:thoughtId", async (req, res) => {
    console.log("get single thought request");
    try {
        let thought = await Thought.findById(
            { _id: req.params.thoughtId }
        );
        console.log(thought);
        res.send(thought);
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    console.log("create thought request");
    try {
        let thought = await Thought.create(req.body);
        let user = await User.findByIdAndUpdate(
            { _id: req.body.userId },
            {
                $push: {
                    thoughts: thought._id
                }
            },
            { new: true }
        );
        console.log(thought, user);
        res.send(thought);
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.put("/:thoughtId", async (req, res) => {
    console.log("update thought request");
    try {
        let thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        );
        console.log(thought);
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

router.delete("/:thoughtId", async (req, res) => {
    console.log("delete thought request");
    try {
        await Thought.findByIdAndDelete(
            { _id: req.params.thoughtId }
        );
        res.status(200).end();
    } catch (err) {
        res.status(500).end();
        console.log(err);
    }
});

module.exports = router;
