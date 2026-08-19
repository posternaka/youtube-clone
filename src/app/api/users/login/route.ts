import { users } from "../db";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers';
import jsonwebtoken from 'jsonwebtoken';

export async function POST(request: Request) {
    const data = await request.json();

    const user = users.get(data.nickname);

    if (!user) {
        return Response.json({ ok: false, message: "User is not found" }, { status: 400 });
    }

    const isPasswordsEqual = await bcrypt.compare(data.password, user.password);

    if (!isPasswordsEqual) {
        return Response.json({ ok: false, message: "Password is incorrect" }, { status: 400 });
    }
    
    const { id, nickname } = user;

    const jwt = jsonwebtoken.sign({ id, nickname }, 'token-12');

    const cookiesStore = await cookies();

    cookiesStore.set('x-auth-token', jwt, {
        maxAge: 10000,
        httpOnly: true,
        secure: true
    });

    return Response.json({ ok: true, user: { id, nickname } });
}

