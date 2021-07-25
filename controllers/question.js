const router = require('express').Router()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const Question = require('../models/question')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))


router.post('/', [
    check('question').not().isEmpty().trim().escape()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "success",
            status: false,
            error: errors.array(),
            data: req.body
        })
    }

    Question.create({
        question: req.body.question
    }, (err, result) => {
        if (err) {
            return res.status(422).json({
                message: "success",
                status: false,
                error: errors.array()
            })
        }
        return res.status(200).json({
            message: 'success',
            status: 200,
            data: req.body
        })
    })
})

router.put('/answer', [
    check('answer').not().isEmpty().trim().escape()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "success",
            status: false,
            error: errors.array(),
            data: req.body
        })
    }

    Question.findByIdAndUpdate(req.body.id,
        { $push: { answers: { answer: req.body.answer, name: req.body.name } } }
        , (err, result) => {
            if (err) {
                return res.status(422).json({
                    message: "success",
                    status: false,
                    error: errors.array()
                })
            }
            return res.status(200).json({
                message: 'success update',
                status: 200,
                data: result
            })
        })
})


router.get('/', (req, res) => {
    Question.find((err, result) => {
        if (err) {
            return res.status(422).json({
                message: "success",
                status: false,
                error: errors.array()
            })
        }
        return res.status(200).json({
            message: 'success',
            status: 200,
            data: result
        })
    })
})

router.get('/:id', (req, res) => {
    Question.findOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(422).json({
                message: "success",
                status: false,
                error: errors.array()
            })
        }
        return res.status(200).json({
            message: 'success',
            status: 200,
            data: result
        })
    })
})


router.all('/', (req, res) => {
    return res.status(200).json({
        message: 'success',
        status: 200
    })
})

module.exports = router