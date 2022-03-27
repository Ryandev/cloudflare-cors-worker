import util from './util';

export type HANDLER = (request: Request) => Promise<Response>;

async function handlerDefault(request: Request): Promise<Response> {
    const url = util.headers.xTargetUrl(request.headers) ?? request.url;

    const fetchRequest = util.request.addURL(request, url);

    const response = await fetch(fetchRequest);

    return util.response.addHeaders(response, util.headers.enableCORS(request));
}

async function handlerOptions(request: Request): Promise<Response> {
    let response = await handlerDefault(request);

    if (response.status === util.statusCodes.METHOD_NOT_ALLOWED) {
        response = await handlerDefault(util.request.addMethod(request, 'HEAD'));
    }

    return response;
}

export function handlerForRequest(request: Request): HANDLER {
    let handler: HANDLER = handlerDefault;

    if (request.method.toUpperCase() === 'OPTIONS') {
        handler = handlerOptions;
    }

    return handler;
}
