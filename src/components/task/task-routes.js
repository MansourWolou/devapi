import Router from '@koa/router'
import * as TaskControllers from '#components/task/task-controllers.js'
import { isAuthenticated, isAuthenticatedWithUser} from '#middleware/jwt-handler.js'

const tasks = new Router()

tasks.get('/', TaskControllers.index)
tasks.get('/protected',isAuthenticated,(ctx)=> {
    ctx.ok({
        message: "thi route is protected"
    })
    ctx.body = "This route is protected"
})
tasks.get('/:id', isAuthenticatedWithUser ,TaskControllers.id)
tasks.get('/lists/:listId',isAuthenticatedWithUser, TaskControllers.getAllByList)
tasks.post('/', isAuthenticatedWithUser,TaskControllers.create)
tasks.put('/:id',isAuthenticatedWithUser , TaskControllers.update)
tasks.del('/:id', isAuthenticatedWithUser ,TaskControllers.destroy)

export default tasks