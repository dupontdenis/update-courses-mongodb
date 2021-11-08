const mongoose = require('mongoose');
const Courses = require('../models/courses');
mongoose.connect('mongodb://localhost/my_courses', { useUnifiedTopology: true, useNewUrlParser: true });

const debug = require('debug')('app_api');


const coursesReadAll = async (req, res) => {
    debug("API--- coursesReadAll ---");
    const courses = await Courses.find({});
    res.json({ courses: courses });
}

const coursesCreateOne = async (req, res) => {
    debug("API--- coursesCreateOne ---");
    await Courses.create(req.body, (error, course) => {
        res.json(course);
    })
}


const coursesReadOne = async (req, res) => {
    debug("API--- coursesReadOne ---");
    const course = await Courses.findById(req.params.id)
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(course);
}


const coursesUpdateOne = async (req, res) => {
    debug("API--- coursesUpdateOne ---");
    const course = new Courses(
        {
            name: req.body.name,
            info: req.body.info,
            _id: req.params.id
        }
    );

    Courses.findByIdAndUpdate(req.params.id, course, {}, function (err, thecourse) {
        if (err) { return next(err); }
        // Successful - redirect to genre detail page.
        res.send(thecourse);
    });
}

const coursesDeleteOne = async (req, res) => {
    debug("API--- coursesDeleteOne ---");
    const course = await Courses.findByIdAndDelete(req.params.id)
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(null);
}

module.exports = {
    coursesReadAll,
    coursesCreateOne,
    coursesReadOne,
    coursesUpdateOne,
    coursesDeleteOne
};