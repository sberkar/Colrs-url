const User = require("../models/user");

const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const router = require("express").Router();
const { body, validationResult } = require("express-validator/check")

router.post("/signup", [
    body("name").isLength({min: 3}).withMessage("please enter name with more than 3 characters"),
    body("email").isEmail().withMessage("please enter a valid email"),
    body("password").isStrongPassword({minLength: 8, minLowercase: 2, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage("please create a strong password with letters, numbers & symbols")
], (req, res) => {
    let userName = req.body.name;
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    let errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({message: "Validation failed", errors})
    User.findOne({email: userEmail}).then(user => {
        if(user){
            return res.status(400).json({
                error: {
                    message: "user already exists"
                }
            })
        }
        bcrypt.hash(userPassword, 12).then(hashedPassword => {
            let userObject = new User({
                name: userName,
                email: userEmail,
                password: hashedPassword 
            })
            userObject.save().then(() => {
                return res.status(201).json({
                    success: {
                        message: "user sign up successful"
                    }
                })
            }).catch(err => console.log(err))
        })
    }).catch(err => console.log(err))
})

router.post("/login", (req, res) => {
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    User.findOne({email: userEmail}).then(user => {
        if(!user) {
            return res.status(400).json({
                error: {
                    message: "Email or Password is not matching"
                }
            })
        }
        bcrypt.compare(userPassword, user.password).then(isMatched => {
            if(!isMatched){
                return res.status(400).json({
                    error: {
                        message: "Email or Password is not matching"
                    }
                })
            }
            const accessToken = jsonwebtoken.sign({ name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
            
            const refreshToken = jsonwebtoken.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

            user.refreshToken = refreshToken
            user.save().then(() => {
                res.cookie("refToken", refreshToken, { httpOnly: true, maxAge: 43200000 })
                res.json({accessToken})
            }).catch(err => console.log(err))
        })
    })
})

router.post("/refresh", (req, res) => {
    let refreshToken = req.body.refToken;
    jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({error: { message: "please authenticate first" }})
        User.findOne({email: decoded.email}).then(user => {
            if(!user) return res.status(400).json({error: { message: "please authenticate first!"}})
            let accessToken = jsonwebtoken.sign({ name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            return res.status(201).json({accessToken})
        }).catch(err => console.log(err))
    })
})

module.exports = router;