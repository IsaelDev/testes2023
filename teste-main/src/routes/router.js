const router = require('express').Router()


router
    .route('/add')
    .post((req, res)=>musicController.addMusic(req, res))


module.exports = router