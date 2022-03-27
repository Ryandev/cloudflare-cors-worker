function addHeaders(response: Response, headers: Record<string, string>): Response {
    /* clone response to remove immutability */
    const newResponse = new Response(response.body, response);

    Object.entries(headers).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
    });

    return newResponse;
}

const output = {
    addHeaders,
};

export default output;
