const router = require("express").Router();
const contactGroupController = require("../controllers/contactGroupController");

router.post("/createGroup", contactGroupController.createGroup);
router.get("/getGroupsBySite/:siteId", contactGroupController.getGroupsBySiteId);

module.exports = router;