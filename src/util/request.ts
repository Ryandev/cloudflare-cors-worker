function addURL(request: Request, url: string): Request {
    const newRequest = new Request(url, {
        ...request,
    });

    return newRequest;
}

function addMethod(request: Request, method: string): Request {
    const newRequest = new Request(request.url, {
        ...request,
        method,
    });

    return newRequest;
}

function addHeaders(request: Request, headers: Record<string, string>): Request {
    const newRequest = new Request(request.url, {
        ...request,
        headers: {
            ...request.headers,
            ...headers,
        },
    });

    return newRequest;
}

const output = {
    addURL,
    addHeaders,
    addMethod,
};

export default output;
