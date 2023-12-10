import { toast } from "react-hot-toast";


export default async function useHandleProxyRequest(url, method, body=null) {
    const initOptions = {
        cache: "no-store",
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    }

    if (body) {
        initOptions.body = JSON.stringify(body);
    }

    const response = await fetch(
        url,
        initOptions
      )
      .catch(error => {
        return {error: error}
      })

    if (response?.error || response?.status == 500) {
        toast.error("It appears that our system is currently unresponsive. Please try again later.");
        return;
    }

    const responseJSON = await response.json();

    if (responseJSON?.error) {
        toast.error(responseJSON.error);
        return;
    }

    toast.success(responseJSON.message);

    return responseJSON;
}