// routes/content.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/content.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.get('/', ctrl.getContent);
router.put('/', requireAuth, ctrl.upsertContent);

module.exports = router;
