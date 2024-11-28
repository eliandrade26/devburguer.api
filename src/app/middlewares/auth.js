
import jwt from 'jsonwebtoken';
import autoConfig from '../../config/auth';

function autoMiddleware(request, headers, authorization) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided' });
    }

    const token = authToken.split('').at(1);

    try {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                throw new Error();
            }

            request.userid=decoded.id;
            request.usarName=decoded.name;
            
        });
        } catch (err) {
        return response.status(401).json({ error: 'Token is invalid' });
    }

    return next();

}
export default  authMiddleware;