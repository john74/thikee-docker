import { refreshAccessToken } from "@lib";


async function handleApiRequest(request) {
    const publicPaths = ["/sign-in", "/sign-up"];
    const pathname = request.nextUrl.pathname;
    const isProtectedPath = !publicPaths.some(path => pathname.includes(path));

    const accessToken = isProtectedPath ? await refreshAccessToken() : null;
    const method = request.method;
    const body = request.body ? await request.json() : null;

    const initOptions = {
        cache: "no-store",
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (accessToken) {
        initOptions.headers.authorization = `JWT ${accessToken}`;
    }

    if (body) {
        initOptions.body = JSON.stringify(body);
    }

    const decodedUrl = decodeURIComponent(request.url);
    const newUrl = new URL(decodedUrl);
    const targetEndpoint = newUrl.searchParams?.get("targetEndpoint");

    const url = `${process.env.BACKEND_URL}/${targetEndpoint}`;
    return await fetch(url, initOptions);
}

export default handleApiRequest;