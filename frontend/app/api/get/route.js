import { handleApiRequest } from "@lib";


export async function GET(request) {
    return await handleApiRequest(request);
}