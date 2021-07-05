import TokenInterface from "./TokenInterface";
import jwt from "jsonwebtoken";


export default class JwtToken implements TokenInterface {

    // @ts-ignore
    private payload: { [key: string]: any };

    withPayload(payload: { [key: string]: any }): JwtToken {
        this.payload = payload;
        return this;
    }

    decode(token: string): any {
        // @ts-ignore
        return jwt.decode(token, process.env.JWT_SECRET);
    }

    get() {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (15 * 60),
            ...this.payload
            // @ts-ignore
        }, process.env.JWT_SECRET)
    }

    isValid(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
             // @ts-ignore
            return jwt.verify(token, process.env.JWT_SECRET, (err, payloadDecoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(payloadDecoded)
                }
            });
        })
    }
}