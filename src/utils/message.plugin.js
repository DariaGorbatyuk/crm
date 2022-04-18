export default {
    install(app, options){
        const $message = function (html){
            M.toast({html})
        }

        const $error = function (html){
            M.toast({html:`[Error]: ${html}`})
        }

        app.provide('$message', $message)
        app.provide('$error', $error)
    }

}