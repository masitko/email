
var mongoose = require('mongoose');
var Gif = mongoose.model('Gif');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                return err.errors[errName].
                        message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var gif = new Gif(req.body);
    gif.creator = req.user;
    gif.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(gif);
        }
    });
};

exports.list = function(req, res) {
    Gif.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, gifs) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(gifs);
        }
    });
};

exports.gifByID = function(req, res, next, id) {
    Gif.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, gif) {
        if (err)
            return next(err);
        if (!gif)
            return next(new Error('Failed to load gif ' + id));
        req.gif = gif;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.gif);
};

exports.update = function(req, res) {
    var gif = req.gif;
    gif.title = req.body.title;
    gif.content = req.body.content;
    gif.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(gif);
        }
    });
};

exports.delete = function(req, res) {
    var gif = req.gif;
    gif.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(gif);
        }
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.gif.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
