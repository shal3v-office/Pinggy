const router = require("express").Router();
const contactController = require("../controllers/contactController");

router.post("/createContact", contactController.createContact);
router.get("/getContactByUser/:userId", contactController.getContactByUserId);
router.get("/getContactsBySite/:siteId", contactController.getContactsBySiteId);

module.exports = router;