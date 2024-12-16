const { Router } = require("express");
const { userLogin, userSignup } = require("../controllers/userControl");

const router = Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);

module.exports = router;
