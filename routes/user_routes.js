const user_controller = require('../controller/user_controller')

function create_users_routes(app){
   
    app.post('/register',user_controller.register)
    app.post('/login',user_controller.login)
    app.get("/verify",user_controller.verify)

}
 
module.exports = {create_users_routes}