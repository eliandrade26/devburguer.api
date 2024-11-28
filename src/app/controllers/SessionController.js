import User from "../models/User";
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authconfig from '../../config/auth';

class SessionController {
    async store(resquest, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const isValid = await schema.isValid(resquest.body);

        const emailOrPasswordIncorrect = () => {
            response
                .status(401)
                .json({ error: 'Make sure your email or password are correct' });

        }
        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email,

            },
        });

        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const isSamePassword = await user.cheackPassword(password);

        if (!isSamePassword) {
            emailOrPasswordIncorrect
        }

        return response.status(201).json({
            id: user.id, name: user.name, email, admin: user.admin, token: jwt.sign({ id: user.id, name:user.name }, authconfig.secret, {
                expiresIn: authconfig.expiredIn,
            }),
        });
    }
}

export default new SessionController();