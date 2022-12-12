import UserModel from '#components/user/user-model.js'
import Joi from 'joi'
import argon2, { hash } from 'argon2'
import { sendWelcomeEmail } from '#services/mailing/welcome-email.js'

export async function register (ctx) {
 try {
  const registerValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    terms_and_conditions: Joi.boolean().valid(true).required()
  })
  const params = ctx.request.body
  const { error, value } = registerValidationSchema.validate(params)
  if(error) throw new Error(error)
  const hashedPassword = await argon2.hash(value.password)
  const newUser = new UserModel({
    ...value,
    password: hashedPassword,
    settings: {
      terms_and_conditions: value.terms_and_conditions
    }
  })
  newUser.generateEmailVerificationToken()
  const user = await newUser.save()
  await sendWelcomeEmail(user,user.settings.validation_email_token)
  const token = user.generateJWT()
  ctx.ok({token})
 } catch(e) {
  ctx.badRequest({ message: e.message })
 }
}


export async function login (ctx) {
  try {
    const registerValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
    const params = ctx.request.body
    const { error, value } = registerValidationSchema.validate(params)
    if(error) throw new Error(error)

    const credentials = await UserModel.find({email:params.email});
    if (!credentials[0]) throw new Error(" no credentials ")
    if (!(await argon2.verify(potentialUserPassword[0].password,params.password))) {
      throw new Error(" no credentials ")
    }
    const userLogin = UserModel(...credentials);
    ctx.ok(userLogin.generateJWT)
  } catch (error) {
    ctx.badRequest({ message: e.message })
  }

}

export async function profile (ctx) {
  try {
    const registerValidationSchema = Joi.object({
      email: Joi.string().email().required()
    })
    const params = ctx.request.body
    const { error, value } = registerValidationSchema.validate(params)
    if(error) throw new Error(error)

    const profile = await UserModel.find({email:params.email});
    const userProfile = UserModel(...profile);
    ctx.ok(userProfile)
  } catch (error) {
    ctx.badRequest({ message: e.message })
  }

}