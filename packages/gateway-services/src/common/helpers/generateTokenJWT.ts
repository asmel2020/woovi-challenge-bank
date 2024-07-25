import jwt from 'jsonwebtoken';
import configuration from '../../config/configuration';


export const generateTokenJWT = (text:string ,secretOrPrivateKey:string) => jwt.sign({ id: 's' }, secretOrPrivateKey);

export const decodeTokenJWT = <T>(token: string,secretOrPrivateKey:string): T => jwt.verify(token.split(' ')[1],secretOrPrivateKey) as T;
