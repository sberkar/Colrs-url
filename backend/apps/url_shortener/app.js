const express = require("express");
const randomstring = require("randomstring")
const Url = require("./models/url")
const userRouter = require("./routes/user")

const router = express.Router();

router.use("/user", userRouter)

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
    res.json([{
        urlTitle: "Facebook Profile",
        url: "https://www.facebook.com/sberkar12",
        code: "dY5txr4f"
    }])
})

router.get("/:code", (req, res, next) => {
    let code = req.params.code;
    Url.findOne({code: code}).then(urlInformation => {
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

router.post("/", (req, res, next) => {
    let url = req.body.url;
    let urlTitle = req.body.urlTitle;
    let code = randomstring.generate(8)
    checkUrlCode(code, code_obj => {
        if(code_obj.found === false){
            let url_data = new Url({url: url, title: urlTitle, code: code_obj.code});
            url_data.save().then(result => {
                console.log(result)
                res.json(url_data)
            }).catch(err => console.log(err))
        }
    })
})

module.exports = router;