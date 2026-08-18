import { users } from "../db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const data = await request.json();

    const user = users.get(data.nickname);

    if (!user) {
        return Response.json({ ok: false, message: "User is not found" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    if (user.password !== hashPassword) {
        return Response.json({ ok: false, message: "Password is incorrect" }, { status: 400 });
    }
    
    const { id, nickname } = user;

    return Response.json({ ok: true, user: { id, nickname } });
}

