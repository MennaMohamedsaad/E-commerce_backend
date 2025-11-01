import express from 'express';
const cartRouter =express.Router;
import * as CaC from './cart.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import * as valid from './cart.validation.js';





cartRouter.post("/",
   validation(valid.createCart),
   auth("user"),
   CaC.createCart
);

cartRouter.patch("/:id",
    validation(valid.deleteCart),
    auth("user"),
    CaC.deleteCart
 );

 cartRouter.put("/:id",
   validation(valid.clearCart),
   auth("user"),
   CaC.clearCart
);





export default cartRouter;