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

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.get("/api/workouts", (_req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(data);
        }
    });
});

// app.put("/api/workouts/:id", (req, res) => {
//     // Remember: when searching by an id, the id needs to be passed in
//     // as (mongojs.ObjectId(IdYouWantToFind))
//     db.Workout.update(
//       {
//         _id: mongojs.ObjectId(req.params.id)
//       },
//       {
//         $set: {
//           read: true
//         }
//       },
//       (err, data) => {
//         if (err) {
//           console.error(err);
//         } else {
//           res.json(data);
//         }
//       }

//     );
//   });


// app.post("/api/workouts", ({ body }, res) => {
//     db.Workout.create(body)
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

