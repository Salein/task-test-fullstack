const Router = require('express')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const router = new Router()


router.post('/messages',
    [
        check('name', "Некорректное Имя пользавателя").isLength({min:2, max:10}),
        check('phone', "Некорректный номер телефона").isLength({min:11, max:17}),
        check( 'message', "Неккоректное сообщение").isLength({min:2, max:100})
    ],
    async (req, res) => {
        console.log('Получен запрос:', req.body)
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Некорректные данные", errors})
        }
        const {name, phone, message} = req.body
        const user = new User({name, phone, message})
        await user.save()
        console.log('✅ Данные сохранены в БД');
        return res.status(200).json({message: "Сообщение отправлено"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router