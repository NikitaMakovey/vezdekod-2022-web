let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const items = require("../public/files/emails/small.json"); // local data storage
    res.status(200).json(items);
});

module.exports = router;