import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import  UserModel  from '../models/user.js';



export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {expiresIn: '24h'});

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        })
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email})
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный пользователь или пароль"
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {expiresIn: '24h'});

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token})

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось авторизоваться",
        })
    }
};

export const getMe = async(req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const {passwordHash, ...userData} = user._doc;
        res.json({userData})
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Нет доступа",
        })
    }
};
export const update = async (req, res) => {
    try {
        const { fullName, avatarUrl } = req.body;

        if (!req.userId) {
            return res.status(401).json({
                message: 'Пользователь не авторизован',
            });
        }
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        user.fullName = fullName;
        user.avatarUrl = avatarUrl;

        await user.save();
        res.json({
            message: 'Профиль пользователя успешно обновлен',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось обновить профиль пользователя',
        });
    }
};

