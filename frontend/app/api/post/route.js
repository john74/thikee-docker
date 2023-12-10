import { handleApiRequest } from "@lib";


export async function POST(request) {
    return await handleApiRequest(request);
}