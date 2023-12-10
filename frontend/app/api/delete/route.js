import { handleApiRequest } from "@lib";


export async function DELETE(request) {
    return await handleApiRequest(request);
}