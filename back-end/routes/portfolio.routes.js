// routes/portfolio.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/portfolio.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.get('/', ctrl.listImages);
router.post('/', requireAuth, ctrl.createImage);
router.put('/:id', requireAuth, ctrl.updateImage);
router.delete('/:id', requireAuth, ctrl.deleteImage);

module.exports = router;