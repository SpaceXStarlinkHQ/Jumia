import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import ordersRouter from "./orders";
import checkoutRouter from "./checkout";
import storeRouter from "./store";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(checkoutRouter);
router.use(storeRouter);
router.use(adminRouter);

export default router;
