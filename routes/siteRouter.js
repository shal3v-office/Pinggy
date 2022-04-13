const router = require("express").Router();
const siteController = require("../controllers/siteController");

router.post("/createSite", siteController.createSite);
router.get("/getSitesByCustomerId/:customerId", siteController.getSitesByCustomerId);
router.post("/updateSiteInnerLinks", siteController.updateSiteInnerLinks);

module.exports = router;