let express = require('express');
let router = express.Router();
const fs = require('fs');

// JSON keeps all the emails
const STORAGE_ENDPOINT = (request) => `${request.app.get('storage')}/emails.json`;

function syncStorageData(request, data) {
    fs.writeFileSync(STORAGE_ENDPOINT(request), JSON.stringify(data, null, 4));
}

/* GET emails listing. */
router.get('/', function(request, response, next) {
    const items = require(STORAGE_ENDPOINT(request)); // local data storage
    response.status(200).json(items);
});

router.get('/:id/read', function(request, response, next) {
    let items = require(STORAGE_ENDPOINT(request)); // local data storage
    const updateItems = items.map((item) => {
        if (item.id === request.params.id) {
            item.read = true;
        }
        return item;
    });
    syncStorageData(request, updateItems);
    response.status(204).send('');
});

router.get('/:id/unread', function(request, response, next) {
    let items = require(STORAGE_ENDPOINT(request)); // local data storage
    const updateItems = items.map((item) => {
        if (item.id === request.params.id) {
            item.read = false;
        }
        return item;
    });
    syncStorageData(request, updateItems);
    response.status(204).send('');
});

router.get('/read', function(request, response, next) {
    let items = require(STORAGE_ENDPOINT(request)); // local data storage
    const ids = request.query.ids ? Object.values(request.query.ids) : [];
    const updateItems = items.map((item) => {
        if (ids.includes(item.id)) {
            item.read = true;
        }
        return item;
    });
    syncStorageData(request, updateItems);
    response.status(204).send('');
});

router.get('/unread', function(request, response, next) {
    let items = require(STORAGE_ENDPOINT(request)); // local data storage
    const ids = request.query.ids ? Object.values(request.query.ids) : [];
    const updateItems = items.map((item) => {
        if (ids.includes(item.id)) {
            item.read = false;
        }
        return item;
    });
    syncStorageData(request, updateItems);
    response.status(204).send('');
});

module.exports = router;