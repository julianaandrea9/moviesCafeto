const config = require('../config/application')
const utils = require('../utils/general')
const MovieDB = require('moviedb')('47169a57baae1ec6709adb61a97f58aa');
const commentMovieModel = require('../models/comments')

async function getMovieByName(req, res) {
    try {
        const params = {
            query: req.body.name,
            year: req.body.year || '2019',
            region: 'US'
        }
        if (params.year >= 2010 && params.year <= 2019) {
            await MovieDB.searchMovie(params, (err, result) => {
                if (result.total_results > 0) {
                    utils.returnResponse(200, result, null, true, res)
                } else {
                    utils.returnResponse(400, null, 'The movie not found, please verify the name', false, res)
                }
            })
        } else {
            utils.returnResponse(400, null, 'The year must be between 2011 and 2019', false, res)
        }
    } catch (error) {
        utils.returnResponse(500, null, error, false, res)
    }
}

async function commentsByUser(req, res) {
    try {
        await MovieDB.movieInfo({ id: req.body.idMovie }, async (err, result) => {
            if (result) {
                let infoMovie = await commentMovieModel.findOne({ IdMovie: req.body.idMovie, User: req.body.user })
                const data = {
                    MovieRating: req.body.rating,
                    DateSave: new Date().toISOString()
                }
                if (infoMovie) {
                    await commentMovieModel.findByIdAndUpdate(infoMovie._id, data)
                    return utils.returnResponse(200, 'Updated rating', null, true, res)
                } else {
                    if (req.body.rating <= 5) {
                        const paramsMovie = new commentMovieModel({
                            IdMovie: req.body.idMovie,
                            NameMovie: result.original_title,
                            User: req.body.user,
                            MovieRating: req.body.rating,
                            CommentMovie: req.body.comment,
                            DateSave: new Date().toISOString()
                        })
                        paramsMovie.save()
                        return utils.returnResponse(200, 'Comment created successfully', null, true, res)
                    } else {
                        utils.returnResponse(400, null, 'The rating must be 1 (worst) to 5 (best)', false, res)
                    }
                }
            } else {
                utils.returnResponse(400, null, 'The movie not found, please verify the name', false, res)
            }
        })
    } catch (error) {
        utils.returnResponse(500, null, error, false, res)
    }
}

async function deleteRatingMovie(req, res) {
    try {
        await MovieDB.movieInfo({ id: req.params.idMovie }, async (err, result) => {
            if (result) {
                let infoMovie = await commentMovieModel.findOne({ IdMovie: req.params.idMovie, User: req.params.user })
                if (infoMovie) {
                    await commentMovieModel.findByIdAndRemove(infoMovie._id)
                    return utils.returnResponse(200, 'Rating has been removed', null, true, res)
                } else {
                    return utils.returnResponse(400, null, 'No rating found to remove', false, res)
                }
            } else {
                utils.returnResponse(400, null, 'The movie not found, please verify the name', false, res)
            }
        })
    } catch (error) {
        utils.returnResponse(500, null, error, false, res)
    }
}

async function listComment(req, res) {
    try {
        const data = await commentMovieModel.find({})
        if (data) {
            return utils.returnResponse(200, data, null, true, res)
        } else {
            return utils.returnResponse(400, null, 'No ratings found', false, resp)
        }
    } catch (error) {
        utils.returnResponse(500, null, error, false, res)
    }
}

module.exports = {
    getMovieByName,
    commentsByUser,
    deleteRatingMovie,
    listComment
}
