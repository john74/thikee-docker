import { cookies } from "next/headers";


async function refreshAccessToken() {
    let accessToken = cookies().get("accessToken")?.value;
    if (accessToken) return accessToken;

    const refreshToken = cookies().get('refreshToken')?.value;
    if (!refreshToken) return;

    const initOptions = {
        cache: "no-store",
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"refresh": refreshToken}),
    }

    let response = await fetch(`${process.env.BACKEND_URL}/api/users/refresh-token/`, initOptions);
    let responseJSON = await response.json();
    accessToken = responseJSON.accessToken;
    const accessTokenLifetime = responseJSON["access_token_lifetime"];
    cookies().set({
        name: "accessToken",
        value: accessToken,
        httpOnly: true,
        maxAge: accessTokenLifetime, // seconds
        path: "/"
    })

    return accessToken;
}

export default refreshAccessToken;