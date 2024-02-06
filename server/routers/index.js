const Router = require('express').Router
const UserController = require('../controllers/UserController')
const {body} = require('express-validator')
const authMiddleware = require("../middlewares/authMiddleware");
const AdminController = require('../controllers/AdminController')
const rolesMiddleware = require("../middlewares/roleMiddleware");
const router = new Router()

router.post('/registration',
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({
        min: 8, max: 32
    }),
    UserController.register
)
router.post('/login',
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength({
        min: 8, max: 32
    }),
    UserController.login
)
router.get('/refresh', UserController.refresh)
router.get('/activate/:link', UserController.activate)
router.post('/logout', UserController.logout)
router.get('/users', authMiddleware, rolesMiddleware(['Admin']), AdminController.getAllUsers)
router.put('/user-roles/:id', authMiddleware, rolesMiddleware(['Admin']), AdminController.updateUserRoles)



module.exports = router
