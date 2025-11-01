import express from 'express';
const categoryRouter =express.Router;
import * as CC from './category.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import * as valid from './category.validation.js';
import { multerHost, validationExtension } from '../../service/multerLocal.js';
import subCategoryRouter from '../subategory/subCategory.routes.js';


categoryRouter.use("/:categoryId/subCategory",subCategoryRouter)


categoryRouter.post("/",
   multerHost(validationExtension.image).single("image"),
   validation(valid.createCategory),
   auth("admin"),
   CC.createCategory
);

categoryRouter.put("/:id",
    multerHost(validationExtension.image).single("image"),
    validation(valid.updateCategory),
    auth("admin"),
    CC.updateCategory
 );


categoryRouter.get("/",
   auth("admin"),
   CC.getCategory
);




export default categoryRouter;