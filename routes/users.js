const exporess = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    TEST ROUTE
// @access  Public
router.get('/',(req,res) => res.send('User route');)

module.exports = router;
