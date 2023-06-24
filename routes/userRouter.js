const {Router} = require('express');
const userControllers = require('../controllers/userControllers');
const router = Router();
const passport = require('passport');

router.get('/', userControllers.getUser)
router.post('/insert', userControllers.insert)
router.post('/login', userControllers.login)
router.get('/viewdata',passport.authenticate('jwt', { session: false }),userControllers.viewdata);
router.delete('/deleteData/:id', userControllers.deleteData)
router.put('/updateData/:id', userControllers.updateData)

module.exports = router
