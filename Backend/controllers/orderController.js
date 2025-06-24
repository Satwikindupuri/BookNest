const Order = require('../models/order');

// POST /api/orders
const placeOrder = async (req, res) => {
    try {
        const { userId, books, totalPrice } = req.body;

        const newOrder = new Order({
            userId,
            books,
            totalPrice
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
};

// GET /api/orders/my-orders/:userId
const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ userId }).populate('books.bookId', 'title price image');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user orders', error });
    }
};

// GET /api/orders/all
const getAllOrders = async (req, res) => {
  console.log("📥 getAllOrders API hit");
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('books.bookId', 'title price image');
      
    res.json(orders);
  } catch (error) {
    console.error("❌ Error in getAllOrders:", error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};


// PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

// GET /api/orders/seller/:sellerId
const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Find orders where any book matches this seller
    const orders = await Order.find({ 'books.sellerId': sellerId }).populate('books.bookId', 'title price image');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller orders', error });
  }
};



module.exports = { getAllOrders, getUserOrders, placeOrder, updateOrderStatus, getSellerOrders };


//module.exports = { placeOrder, getUserOrders, getAllOrders };
