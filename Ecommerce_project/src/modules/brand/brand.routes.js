import express from 'express';
const brandRouter =express.Router;
import * as BC from './brand.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import * as valid from './brand.validation.js';
import { multerHost, validationExtension } from '../../service/multerLocal.js';




brandRouter.post("/",
   multerHost(validationExtension.image).single("image"),
   validation(valid.createBrand),
   auth("admin"),
   BC.createBrand
);

brandRouter.put("/:id",
    multerHost(validationExtension.image).single("image"),
    validation(valid.updateBrand),
    auth("admin"),
    BC.updatebrand
 );







export default brandRouter;