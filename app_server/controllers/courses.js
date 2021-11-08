const axios = require('axios');
const debug = require('debug')('app_server');

const coursesReadAll = (req, res) => {
    debug('-Server------------- READ ALL-------------------------------')
    axios.get('http://localhost:3000/api/courses')
        .then(function (response) {
            res.render('courses-list', {
                courses: response.data.courses
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const coursesReadOne = (req, res) => {
    debug('-Server------------- READ ONE-------------------------------')

    axios.get(`http://localhost:3000/api/courses/${req.params.id}`)
        .then(function (response) {
            res.render('course-info', {
                course: response.data
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const coursesDeleteOne = (req, res) => {
   // debug('-Server------------- DELETE ONE-------------------------------')
    axios.delete(`http://localhost:3000/api/courses/${req.params.id}`)
        .then(function (response) {
            res.redirect(`/courses/`);
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};



const renderForm = (req, res) => {
    res.render('course-form',
        {
            title: `New Course`,
            error: req.query.err
        }
    );
};

const coursesForm = (req, res) => {
    debug('-Server---------------   FORM  -----------------------')
    renderForm(req, res);
};

const coursesAddOne = (req, res) => {
    debug('-Server---------------   ADD ONE  -----------------------')
    if (!req.body.info || !req.body.name) {
        res.redirect(`/courses/new?err=val`);
    }
    else {
        axios.post('http://localhost:3000/api/courses/', req.body)
            .then(function (response) {
                res.redirect("/courses")
            })
            .catch(function (error) {
                debug(error);
            });
    }
};
// rempli le form !
const coursesUpdate_get = (req, res) => {
    debug('-Server------------- coursesUpdateOne -------------------------------')
    axios.get(`http://localhost:3000/api/courses/${req.params.id}`)
        .then(function (response) {
            res.render('course-form', {
                title: `Update`,
                course: response.data
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};
const coursesUpdate_post = (req, res) => {
    debug('server---------------   ADD UPDATE  -----------------------')
    if (!req.body.info || !req.body.name) {
        res.redirect(`/courses/update/${req.params.id}?err=val`);
    }
    else {
        axios.put(`http://localhost:3000/api/courses/${req.params.id}`, req.body)
        .then(function (response) {
            res.redirect("/courses");
        })
        .catch(function (error) {
            debug(error);
        });
    }
};

module.exports = {
    coursesReadAll,
    coursesReadOne,
    coursesAddOne,
    coursesDeleteOne,
    coursesForm,
    coursesUpdate_get,
    coursesUpdate_post
};