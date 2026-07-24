import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import ordersRouter from "./orders";
import checkoutRouter from "./checkout";
import storeRouter from "./store";
import imageProxyRouter from "./imageProxy";

const router: IRouter = Router();

router.use(healthRouter);
router.use(imageProxyRouter);
router.use(productsRouter);
router.use(ordersRouter);
router.use(checkoutRouter);
router.use(storeRouter);

export default router;
