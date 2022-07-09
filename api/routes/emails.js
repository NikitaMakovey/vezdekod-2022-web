let express = require('express');
let router = express.Router();

// JSON keeps all the emails
const STORAGE_ENDPOINT = "../storage/email.json";

/* GET emails listing. */
router.get('/', function(req, res, next) {
    const items = require(STORAGE_ENDPOINT); // local data storage
    res.status(200).json(items);
});

module.exports = router;