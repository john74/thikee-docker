import {
    headers
} from "next/headers";


async function getPageData(page) {
    const initOptions = {
        cache: "no-store",
        method: "GET",
        headers: headers(),
    }

    const domain = headers()?.get("x-forwarded-host");
    const protocol = headers()?.get("x-forwarded-proto");
    const baseUrl = `${protocol}://${domain}`;

    const url = `${baseUrl}/api/get/?targetEndpoint=api/frontend/${page}/`;
    const response = await fetch(url, initOptions);

    return response.json();
}

export default getPageData;