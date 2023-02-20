const express = require("express");
const randomstring = require("randomstring")
const jsonwebtoken = require("jsonwebtoken")

const Url = require("./models/url")
const userRouter = require("./routes/user");
const User = require("./models/user");

const router = express.Router();

router.use("/user", userRouter)

router.get("/:code", (req, res, next) => {
    let code = req.params.code;
    Url.findOne({ code: code }).then(urlInformation => {
        if(!urlInformation){
            return res.status(404).json({
                message: "No url found with this code"
            })
        }
        res.status(200).json(urlInformation)
    }).catch(err => {
        console.log(err)
    })
})

router.use((req, res, next) => {
    const accessToken = req.get("Authorization").split(" ")[1];

    if(accessToken.length == 0){
        return res.status(401).json({error: {
            message: "please authenticate first"
        }})
    }
    const decode = jsonwebtoken.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(400).json({error: { message: "please authenticate firstt" }})
        
        User.findOne({email: decoded.email}).then(user => {
            if(!user) return res.status(401).json({error: { message: "Please authenticate first" }})

            req.user = user;
            next()
        }).catch(err => console.log(err))
    });

    
})

const checkUrlCode = (code, cb) => {
    Url.findOne({code: code}).then(url => {
        if(url){
            return checkUrlCode(randomstring.generate(8))
        }
        return cb({
            code: code,
            found: false
        })
    }).catch(err => {
        return console.log(err)
    })
}

router.get("/all", (req, res, next) => {
    Url.find({userId: req.user._id.toString()}).then(urls => {
        res.status(200).json(urls)
    }).catch(err => console.log(err))
})

router.post("/", (req, res, next) => {
    let url = req.body.url;
    let urlTitle = req.body.title;
    let code = randomstring.generate(8);
    let userId = req.user._id.toString();

    
    if(url.length === 0 || urlTitle.length === 0){
        return res.status(500).json({
            error:{
                message: "please fill all the fields"
            }
        })
    }
    checkUrlCode(code, code_obj => {
        if(code_obj.found === false){
            let url_data = new Url({url: url, title: urlTitle, code: code_obj.code, userId: userId});
            url_data.save().then(result => {
                console.log(result)
                res.status(201).json(url_data)
            }).catch(err => console.log(err))
        }
    })
})

module.exports = router;