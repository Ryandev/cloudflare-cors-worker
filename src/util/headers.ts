
function enableCORS(request: Request): Record<string, string> {
    return {
        'Access-Control-Allow-Origin': request.headers.get('Origin') ?? '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,PATCH,OPTIONS,DELETE',
        'Access-Control-Allow-Headers': Array.from(request.headers.entries())
            .map(([key]) => key)
            .join(','),
        'Access-Control-Max-Age': '86400',
    };
}

function withPrefix(headers: Headers, prefix: string): Record<string, string> {
    const matching: Record<string, string> = {};

    Array.from(headers.entries())
        .filter(([key]) => key.startsWith(prefix))
        .forEach(([key, value]) => {
            matching[key] = value;
        });

    return matching;
}

function xTargetUrl(headers: Headers): string | undefined {
    let url = headers.get('X-Request-URL')
    
    if ( url && !url.startsWith('http') ) {
        url = `http://${url}`;
    }
    
    return url ?? undefined;
}

const output = {
    withPrefix,
    enableCORS,
    xTargetUrl,
};

export default output;
