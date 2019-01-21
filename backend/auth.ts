import {Request, Response} from 'express';
import {User, users} from './user';
import * as jwt from 'jsonwebtoken';
import {apiConfig} from './api-config'; // Chave do token

export const handleAuthentication = (req: Request, resp: Response) => {
    const user: User = req.body;

    if (isValid(user)) {
        const  dbUser = users[user.email];

        // No token é atribuido email do usuario,Emissor do token, e chave más não é passado para o client
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret);

        resp.json({name: dbUser.name, email: dbUser.email, accessToken: token}) // Retorno para o client
    } else {
        resp.status(403).json({message: 'Dados invalidos!'});
    }

}

function isValid(user: User): boolean {
    if (!user) {
        return false;
    }
    const dbUser = users[user.email];
    return dbUser !== undefined && dbUser.matches(user)

}