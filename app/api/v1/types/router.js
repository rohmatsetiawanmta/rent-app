const express = require('express').Router;
const router = express();
const { create, index, find, update, destroy } = require('./controller');

router.get('/types', index);
router.post('/types', create);
router.get('/types/:id', find);
router.put('/types/:id', update);
router.delete('/types/:id', destroy);

module.exports = router;
