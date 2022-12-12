import Router from '@koa/router'
import * as UserControllers from '#components/user/user-controllers.js'
import { isAuthenticated, isAuthenticatedWithUser} from '#middleware/jwt-handler.js'


const users =  new Router()

users.post('/register', UserControllers.register)
users.post('/login',UserControllers.login)
users.get('/me', isAuthenticatedWithUser  , UserControllers.profile )
export default users