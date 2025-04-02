import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: "http://localhost:5173" || process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"));
app.use(cookieParser())


//router 
import userRouter from "./routes/user.routes.js";
import franchiseRouter from "./routes/franchises.routes.js";
import inventoryRouter from "./routes/inventory.routes.js";
import salesRouter from "./routes/sales.routes.js";
import orderRouter from "./routes/order.routes.js";
import productRouter from "./routes/product.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

app.use("/api/user",userRouter)
app.use("/api/franchise",franchiseRouter);
app.use("/api/inventory",inventoryRouter);
app.use("/api/sales",salesRouter);
app.use("/api/order",orderRouter);
app.use("/api/product",productRouter);
app.use("/api/dashboard",dashboardRouter);

export {app};