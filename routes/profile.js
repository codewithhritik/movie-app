const exporess = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    TEST ROUTE
// @access  Public
router.get('/',(req,res) => res.send('Profile route');)

module.exports = router;
