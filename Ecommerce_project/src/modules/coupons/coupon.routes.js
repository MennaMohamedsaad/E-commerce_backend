import express from 'express';
const couponRouter =express.Router;
import * as CBC from './coupon.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import * as valid from './coupon.validation.js';




couponRouter.post("/",
   validation(valid.createCoupon),
   auth("admin"),
   CBC.createCoupon
);

couponRouter.put("/:id",
    validation(valid.updateCoupon),
    auth("admin"),
    CBC.updateCoupon
 );







export default couponRouter;