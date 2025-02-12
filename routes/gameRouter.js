const { Router } = require("express");
const gameController = require("../controllers/gameController");

const router = Router();

router.get('/:gameId', gameController.getGame);


module.exports = router;