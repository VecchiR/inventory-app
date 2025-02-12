const { Router } = require("express");
const gameController = require("../controllers/gameController");

const router = Router();

router.get('/', gameController.getAllGames);

module.exports = router;