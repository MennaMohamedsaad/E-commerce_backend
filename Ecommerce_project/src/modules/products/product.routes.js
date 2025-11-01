import express from 'express';
import * as PC from './product.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import * as PV from './product.validation.js';
import { multerHost, validationExtension } from '../../service/multerLocal.js';

const productsRouter =express.Router;


productsRouter.post("/", 
  multerHost(validationExtension.image).fields([
    {name:"image",maxCount:1},
    {name:"coverImages",maxCount:3}
  ]),
  validation(PV.createProduct),
  auth("admin") ,
  PC.createProduct);







export default productsRouter;