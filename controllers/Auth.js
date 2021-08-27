const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
//var bcrypt = require('bcryptjs');
//var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    let userArray = [
        {
            name: "abc@gmail.com", password: "123456", info: "abc",

        },
        { name: "admin@gmail.com", password: "123456", info: "abc" }
    ]
    try {
        let arr = userArray.filter((obj) => {
            return obj.name === req.body.name
        })
        let response = arr[0] ? arr[0] : null
        if (response) {
            // if (bcrypt.compareSync(req.body.password, response.password)) {
            if (response.password === req.body.password) {
                response.password = ""
                const token = jwt.sign({ response: response }, "!ssi0nt", { expiresIn: "1h" });
                return res.status(201).send({ data: { response: response, token: token } })
            } else {
                return res.status(201).send({ message: "email or password not matched" })
            }

        } else {
            return res.status(404).send({ message: "Record is not created", response: response })
        }
    } catch (error) {
        return res.status(404).send({ message: "email or password not matched" })
    }
})

module.exports = router



