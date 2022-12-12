import Router from '@koa/router'
import * as listControllers from '#components/list/list-controllers.js'
import { isAuthenticated, isAuthenticatedWithUser} from '#middleware/jwt-handler.js'


const lists = new Router()

lists.get('/', isAuthenticatedWithUser , listControllers.index)
lists.get('/:id', isAuthenticatedWithUser ,listControllers.id)
lists.post('/', isAuthenticatedWithUser, listControllers.create)
lists.put('/:id', isAuthenticatedWithUser , listControllers.update)
lists.del('/:id', isAuthenticatedWithUser, listControllers.destroy)

export default lists