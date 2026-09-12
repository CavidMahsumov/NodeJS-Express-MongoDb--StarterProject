const router = require("express").Router();
const{login,register,me}=require("../controllers/auth.controller")
const AuthValidation=require("../middlewares/Validation/auth.validation")
const {tokenCheck}=require("../middlewares/auth")
router.post("/login", AuthValidation.LoginValidation, login)
router.get("/me", tokenCheck, me)
router.post("/register", AuthValidation.RegisterValidation, register)


module.exports = router;