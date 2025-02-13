const { Router } = require("express");
const gameController = require("../controllers/gameController");

const router = Router();

router.get("/new", gameController.createGameGet);
router.post("/new", gameController.createGamePost);
router.get("/:gameId/edit", gameController.updateGameGet);
router.post("/:gameId/edit", gameController.updateGamePost);
router.get("/:gameId", gameController.getGame);



module.exports = router;