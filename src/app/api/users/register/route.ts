import crypto from "crypto";
import bcrypt from "bcrypt";

import { users } from "../db";

export async function POST(request: Request) {
    const data = await request.json();
    console.log('data', data);

    if (users.has(data.nickname)) {
        return Response.json({ ok: false, message: "User is already registered" }, { status: 400 });
    }

    const id = crypto.randomBytes(16).toString('hex'); 

    const hashPassword = await bcrypt.hash(data.password, 10);

    console.log("hashPassword", hashPassword);

    users.set(data.nickname, {id, nickname: data.nickname, password: hashPassword });

    return Response.json({ ok: true });
}