const { Router } = require("express");
const gameController = require("../controllers/gameController");

const router = Router();

router.get("/new", gameController.createGameGet);
router.post("/new", gameController.createGamePost);
router.get("/:gameId/update", gameController.updateGameGet);
router.post("/:gameId/update", gameController.updateGamePost);
router.post("/:gameId/delete", gameController.deleteGamePost);
router.get("/:gameId", gameController.getGame);



module.exports = router;