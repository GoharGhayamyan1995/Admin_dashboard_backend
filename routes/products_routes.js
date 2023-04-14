const products_controller = require('../controller/products_controller')
const authenticate=require('../controller/Authenticate')

function create_products_routes(app){
    app.get('/product', products_controller.getProduct)
    app.get('/product/:id', products_controller.getProductById)
    app.post('/product',authenticate.authenticateToken,products_controller.createProduct )
    app.delete('/product/:id',authenticate.authenticateToken, products_controller.deleteProduct)
    app.put('/product/:id',authenticate.authenticateToken, products_controller.updateProduct)
}
 
module.exports = {create_products_routes}