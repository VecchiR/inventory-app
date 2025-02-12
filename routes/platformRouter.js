const { Router } = require("express");
const platformController = require("../controllers/platformController");

const router = Router();

router.get('/', platformController.getAllplatforms);

module.exports = router;