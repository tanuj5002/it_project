const express = require("express")
const router = express.Router()
// const upload = require("../middleware/fileUpload")
const {createListing, getListings, userListings, savedListings} = require('../controllers/listingController')
const upload = require("../middleware/fileUpload")
router.post('/new',upload.single('testImage'), createListing).get('/', getListings).get('/currlistings/:id', userListings).get('/savelistings/:id', savedListings)
module.exports = router