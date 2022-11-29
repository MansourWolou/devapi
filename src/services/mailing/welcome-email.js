import transporter from '#config/mailer.js'

export function sendWelcomeEmail (user,token){
    if (!user || !token) {
        throw new Error('User or validation token misssing')
    }
    const messageToUser = {
        from:process.env.Email_SENDER,
        to: user.email,
        subject: 'welcome to our todo app',
        html: `<h1>welcome to our todo application here your validation token: <span style="color: red">${token}</span></h1> `
    }
    return transporter.sendMail(message)
}