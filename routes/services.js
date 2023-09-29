const router = require('express').Router();
const upload = require('../config/multer');
const categoryController = require('../controllers/CategoryController');
const subcategoryController = require('../controllers/SubCategoryController');
const productController = require('../controllers/ProductController');
const authController = require('../controllers/authController');
const checkToken = require('../middleware/authUser');
const verifAdmin = require('../middleware/verifAdmin');
const userController = require('../controllers/UserController');

// Rotas de Categorias -> Para Admin (Cadastrar , Ver , Update , Delelete)
router.route("/category").get((req,res) => categoryController.index(req,res));
router.route("/category").post((req,res) => categoryController.create(req,res));
router.route("/category/:id").delete((req,res) => categoryController.delete(req,res));
router.route("/category/:id").put((req,res) => categoryController.update(req,res));

router.route("/subcategory").get((req,res) => subcategoryController.index(req,res));
router.route("/subcategory").post((req,res) => subcategoryController.create(req,res));
router.route("/subcategory/:id").delete((req,res) => subcategoryController.delete(req,res));
router.route("/subcategory/:id").put((req,res) => subcategoryController.update(req,res));

router.route("/products/").get((req,res) => productController.index(req,res));
router.route("/products").post(upload.single("image"),(req,res) => productController.create(req,res));
router.route("/products/:id").put(upload.single("image"),(req,res) => productController.update(req,res));
router.route("/products/:id").delete((req,res) => productController.delete(req,res));

router.route("/auth/register").post((req,res) => authController.register(req,res));
router.route("/auth/login").post((req,res) => authController.login(req,res));
router.route("/auth/user/:id").get( checkToken,(req,res) => userController.getUser(req,res));

router.route('/auth/user').get(checkToken, (req,res) => userController.returnUserLogado(req,res));
router.route('/users').get((req,res) => userController.getUsers(req,res));

module.exports = router;

