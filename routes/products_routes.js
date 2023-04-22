const products_controller = require('../controller/products_controller')
const authenticate=require('../controller/user_controller')
const upload=require('../middlewer/multer')

function create_products_routes(app){
    app.get('/product', products_controller.getProduct)
    app.get('/product/:id', products_controller.getProductById)
    app.post('/product',upload.single('image'),authenticate.authenticateToken,products_controller.createProduct )
    app.delete('/product/:id', products_controller.deleteProduct)
    app.put('/product/:id',authenticate.authenticateToken, products_controller.updateProduct)
}
 
    module.exports = {create_products_routes}