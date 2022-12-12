import koaJWT from 'koa-jwt'
import * as TaskControllers from '#components/task/'
import 

export const isAthenticated = koaJWT({
    secret: process.env.JWT_SECRET
})

export const resolveUserFromJWT = async function (ctx , next ){
    try {
        const user = await UserModel.findById(ctx.state.user.id)
        ctx.state.user = user
    } catch (e) {
        ctx.unauthorized({message : e.message})
    }
}

export const isAthenticatedWithUser = compose({isAthenticated,resolveUserFromJWT})