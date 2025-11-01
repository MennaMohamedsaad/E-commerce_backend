import express from 'express';
const subCategoryRouter =express.Router({mergeParams:true});
import * as SC from './subCategory.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import * as valid from './subCategory.validation.js';




subCategoryRouter.post("/",
    multerHost(validationExtension.image).single("image"),
    validation(valid.createSubCategory),
    auth("admin"),
    SC.createSubCategory
 );


subCategoryRouter.put("/",
    multerHost(validationExtension.image).single("image"),
    validation(valid.updateSubCategory),
    auth("admin"),
    SC.updateSubCategory
 );


 subCategoryRouter.get("/",
    auth("admin"),
    SC.getSubCategory
 );





export default subCategoryRouter;