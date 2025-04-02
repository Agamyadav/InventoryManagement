import {Order} from "../models/order.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {Product} from "../models/products.models.js";


const createOrder = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params;
    const { orderItems, orderDate,orderAmount } = req.body;
    const order = new Order({
        orderItems,
        orderDate,
        orderStatus : "Pending",
        orderAmount,
        franchiseId,
    });
    await order.save();
    res.status(201).json(new ApiResponse(200,{order},"Order created successfully."));
});


const getOrders = asyncHandler(async (req, res) => {
    const { franchiseId } = req.params;
    const orders = await Order.find({ franchiseId }).populate('orderItems.productId');
    if (orders.length === 0) {
        throw new ApiError(404, "No sales found.");
    }
    res.json(new ApiResponse(200, { orders }, "Sales retrieved successfully."));
});

const getOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found.");
    }
    // to retrieve the products which are orderd in the order
    const orderItems= order.orderItems;
    const products = [];
    orderItems.forEach(async (item)=>{
        const product = await Product.findById(item.productId);
        products.push(product);
    });
    order={...order,orderItems:products};
    res.json(new ApiResponse(200,{order},"Order retrieved successfully."));
});


const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found.");
    }
    order.orderStatus = orderStatus;
    await order.save();
    res.json(new ApiResponse(200,{order},"Order status updated successfully."));
});

const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found.");
    }
    await order.remove();
    res.json(new ApiResponse(200,{}, "Order deleted successfully."));
});

export { createOrder, getOrders, getOrder, updateOrderStatus, deleteOrder };
