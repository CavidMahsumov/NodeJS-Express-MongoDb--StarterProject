const router = require("express").Router();
const{login,register}=require("../controllers/auth.controller")
const AuthValidation=require("../middlewares/Validation/auth.validation")
router.post("/login", login)

router.post("/register", AuthValidation.RegisterValidation, register)

module.exports = router;