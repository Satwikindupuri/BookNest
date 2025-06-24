const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, getSellerOrders } = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', verifyToken, placeOrder);
router.get('/my-orders/:userId', verifyToken, getUserOrders);
router.get('/all', verifyToken, isAdmin, getAllOrders);
router.put('/:id/status', updateOrderStatus);
router.get('/seller/:sellerId', verifyToken, getSellerOrders);

module.exports = router;
