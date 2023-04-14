const category_controller = require('../controller/category_controller')
const authenticate=require('../controller/Authenticate')

function create_categories_routes(app){
    app.get('/category', category_controller.getCategory)
    app.get('/category/:id', category_controller.getCategoryById)
    app.post('/category',authenticate.authenticateToken,category_controller.createCategory )
    app.delete('/category/:id', authenticate.authenticateToken,category_controller.deleteCategory)
    app.put('/category/:id', authenticate.authenticateToken,category_controller.updateCategory)
}
 
module.exports = {create_categories_routes}