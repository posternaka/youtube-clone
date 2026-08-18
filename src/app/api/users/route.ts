import { users } from "./db";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers';
import jsonwebtoken from 'jsonwebtoken';

export async function GET() {
    const cookiesStore = await cookies();
    
    const token = cookiesStore.get("x-auth-token");

    if (!token) {
        return Response.json({ ok: false, message: "The token is outdated" }, { status: 400 });
    }

    const userInfo = jsonwebtoken.verify(token.value, 'token-12');
    console.log(userInfo);

    // const hashPassword = await bcrypt.hash(data.password, 10);

    // if (user.password !== hashPassword) {
    //     return Response.json({ ok: false, message: "Password is incorrect" }, { status: 400 });
    // }
    
    // const { id, nickname } = user;

    // return Response.json({ ok: true, user: { id, nickname } });
}