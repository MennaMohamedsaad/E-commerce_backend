import express from 'express';
const userRouter =express.Router;
import * as UC from './user.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import * as valid from './user.validation.js';
import { multerLocal, validationExtension } from '../../service/multerLocal.js';



userRouter.get("/getUsers",UC.getUsers)
userRouter.get("/verifyEmail/:token",UC.verifyEmail)
userRouter.get("/refreshToken/:reftoken",UC.refreshToken)
userRouter.post("/signIn",validation(valid.signInValidation),UC.signIn)
userRouter.post("/signUp",multerHost(validationExtension.image).single("image"),validation(valid.signUpValidation),UC.signUp)
userRouter.get("/getProfile",auth(),UC.getProfile)
userRouter.patch("/sendCode", UC.forgetPassword)
userRouter.patch("/sendCode", UC.resetPassword)
userRouter.patch("/",auth(), UC.updateUser)
userRouter.delete("/",auth(), UC.deleteUser)


export default userRouter;