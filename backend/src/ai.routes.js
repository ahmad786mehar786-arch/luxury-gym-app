const router = require("express").Router();
const { askAI } = require("./ai.controller");

router.post("/ai", askAI);

module.exports = router;