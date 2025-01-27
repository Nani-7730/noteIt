const express = require('express')
const router = express.Router();

const userControls = require('../controllers/logincontrol')

router.post('/register',userControls.addUser)
router.post('/authUser',userControls.authUser)

module.exports = router;
