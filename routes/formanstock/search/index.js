const {Router} = require('express');
const router = Router();
const searchController = require('../../../controllers/searchController');

router.get('/', searchController.searchStock);

module.exports = router;