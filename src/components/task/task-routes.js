import Router from '@koa/router'
import * as TaskControllers from '#components/task/task-controllers.js'
import { isAthenticated } from '../../middleware/jwt-handler'

const tasks = new Router()

tasks.get('/', TaskControllers.index)
tasks.get('/protected',isAthenticated,(ctx)=> {
    ctx.ok({
        message: "thi route is protected"
    })
    ctx.body = "This route is protected"
})
tasks.get('/:id', TaskControllers.id)
tasks.get('/lists/:listId', TaskControllers.getAllByList)
tasks.post('/', TaskControllers.create)
tasks.put('/:id', TaskControllers.update)
tasks.del('/:id', TaskControllers.destroy)

export default tasks