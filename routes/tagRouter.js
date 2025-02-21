const { Router } = require("express");
const tagController = require("../controllers/tagController");

const router = Router();

router.get("/new", tagController.createTagGet);
router.post("/new", tagController.createTagPost);
router.get("/:tagId/update", tagController.updateTagGet);
router.post("/:tagId/update", tagController.updateTagPost);
router.post("/:tagId/delete", tagController.deleteTagPost);
router.get("/", tagController.getAllTags);


module.exports = router;