const express = require('express');
const router = express.Router();
const controller= require('../../app_api/controllers/travel');
/* GET home page. */
router.get('/', controller.travel);
module.exports = router;