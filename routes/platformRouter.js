const { Router } = require("express");
const platformController = require("../controllers/platformController");
const gameController = require("../controllers/gameController");


const router = Router();

router.get("/new", platformController.createPlatformGet);
router.post("/new", platformController.createPlatformPost);
router.get("/:platformId/update", platformController.updatePlatformGet);
router.post("/:platformId/update", platformController.updatePlatformPost);
router.post("/:platformId/delete", platformController.deletePlatformPost);
router.get("/:platformId", gameController.getGamesByPlatform);
router.get("/", platformController.getAllPlatforms);


module.exports = router;