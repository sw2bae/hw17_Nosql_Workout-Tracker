const express = require("express");
let mongoose = require("mongoose");
let db = require("./ models");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
//HTML routes----------------------------------------------
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

//api routes----------------------------------------------------

//getLastWorkout
app.get("/api/workouts", (_req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(data);
        }
    });
});

//addExercise
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({
        "_id": req.params.id
    },
        { $push: { exercises: req.body } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

//createWorkout

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
});

//getWorkoutsInRange
app.get("/api/workouts/range", (_req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(data);
        }
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

