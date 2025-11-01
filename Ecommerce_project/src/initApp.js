
import connectionDB from "../db/connectionDB.js";
import { AppError } from "../utils/classError.js";
import { globalErrorHandling } from "../utils/globalErrorHandling.js";
import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/categories/category.routes.js";
import couponRouter from "./modules/coupons/coupon.routes.js";
import productsRouter from "./modules/products/product.routes.js";
import subCategoryRouter from "./modules/subategory/subCategory.routes.js";
import userRouter from "./modules/users/user.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";




export const initApp= (app,express)=>{
    const post = 3000;

    app.use(express.json());
    
    app.use("/users", userRouter)
    app.use("/categories", categoryRouter)
    app.use("/subCategories", subCategoryRouter)
    app.use("/products", productsRouter)
    app.use("/brand", brandRouter)
    app.use("/coupon", couponRouter)
    app.use("/cart", cartRouter)
    app.use("/test",auth(["admin"]))


    app.use("*",(req,res,next)=>{
        return next(new AppError(`invalid url ${req.originalUrl}`))
    })

    
    app.use(globalErrorHandling)

    connectionDB();
    app.use('*',(req,res,next)=> res.status(404).json('404 Page Not Found'))
    app.listen(post,()=> console.log(`example app listening on port ${port}`));
}