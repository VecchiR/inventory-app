const { Router } = require("express");

const router = Router();

router.get('/', messagesController.getAllMessages);

module.exports = router;