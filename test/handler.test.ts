import { HANDLER, handlerForRequest } from '../src/handler';

const urlResponseMap: Record<string, Record<string,unknown>> = {
    'https://jsonplaceholder.typicode.com/todos/1': {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },
      'https://jsonplaceholder.typicode.com/todos/2': {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    'https://jsonplaceholder.typicode.com/todos/3': {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    },    
};

const _delay = async (sleepMS: number): Promise<void> => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve();
        }, sleepMS)    
    });
}

async function _attemptRequest(handler: HANDLER, request: Request, retryCount = 3): Promise<Response> {
    for ( let i=0; i<retryCount; i++ ) {
        const response = await handler(request);
        if ( response.status === 200 ) {
            return response;
        }
        await _delay(3000);
    }
    throw new Error(`Failed to get 200 response`);
}

describe('handle', () => {
    test('handle OPTIONS', async () => {
        const request = new Request('https://www.google.com', { method: 'OPTIONS' });
        const handler = handlerForRequest(request);
        const result = await _attemptRequest(handler, request, 3);

        expect(result.headers.get('Access-Control-Allow-Origin')).toEqual('*');
        expect(result.headers.get('Access-Control-Allow-Methods')).toEqual(
            'GET,HEAD,POST,PUT,PATCH,OPTIONS,DELETE',
        );
        expect(result.headers.get('Access-Control-Max-Age')).toEqual('86400');

        expect(result.status).toEqual(200);
        const text = await result.text();
        expect(text.length).toBe(0);
    }, 10000);

    test('handle GET', async () => {
        const url = Object.keys(urlResponseMap)[1];
        const expectedResponse = urlResponseMap[url];
        const request = new Request(url, {
            method: 'GET',
        });
        const handler = handlerForRequest(request);
        const result = await _attemptRequest(handler, request, 3);
        expect(result.status).toEqual(200);
        const json = await result.json();
        expect(json).toEqual(expectedResponse);
    }, 20000);

    test('handle URL:override', async () => {
        const url = Object.keys(urlResponseMap)[2];
        const expectedResponse = urlResponseMap[url];
        const request = new Request('https://www.google.com', {
            headers: { 'X-Request-URL': url },
            method: 'GET',
        });
        const handler = handlerForRequest(request);
        const result = await _attemptRequest(handler, request, 3);
        expect(result.status).toEqual(200);
        const json = await result.json()
        expect(json).toEqual(expectedResponse);
    }, 20000);
});
