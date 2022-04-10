const monitorService = require("../services/monitor-service");
const customerService = require("../services/customer-service");
const axios = require('axios');

const addMonitorRow = async(url, status, siteId) => {
    monitor =  {
        url: url,
        status:status,
        site: siteId
    };
    const createdMonitor = await monitorService.addMonitorRow(monitor);
    console.log(createdMonitor);
};

const runMonitor = async(req, res) => {
    try {
        const monitorRows = [];
        const customers = await customerService.getAllCustomers();
        for(const customer of customers){
            for(const site of customer.sites){
                var url = site.mainURL;
                if(url.charAt(url.length - 1)!="/")url += "/";
                for(const link of site.innerLinks){
                    var monitorUrl = url + link;
                    console.log(monitorUrl);
                    axios.get(monitorUrl)
                    .then(function (response) {
                        monitorRows.push(addMonitorRow(response.config.url, response.status, site._id));
                        console.log(response);
                    })
                    .catch(function (error) {
                        monitorRows.push(addMonitorRow(error.config.url, error.response.status, site._id));
                        console.log(error);
                    })
                }
            }
        }
        return res.status(200).json(monitorRows);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};
// setInterval( runMonitor, 30 * 1000);

const getFaildMonitorRowsBySite = async(req, res) => {
    try {
        const siteId = req.params.siteId;
        const failMonitors = await monitorService.getFaildMonitorRowsBySite(siteId);
        return res.status(200).json(failMonitors);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getMonitorRowsBySite = async(req, res) => {
    try {

        let siteId = req.body.siteId;
        const siteMonitors = await monitorService.getMonitorRowsBySite(siteId);
        return res.status(200).json(siteMonitors);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    runMonitor,
    getFaildMonitorRowsBySite,
    getMonitorRowsBySite
};



// config: {
//     transitional: {
//       silentJSONParsing: true,
//       forcedJSONParsing: true,
//       clarifyTimeoutError: false
//     },
//     adapter: [Function: httpAdapter],
//     transformRequest: [ [Function: transformRequest] ],
//     transformResponse: [ [Function: transformResponse] ],
//     timeout: 0,
//     xsrfCookieName: 'XSRF-TOKEN',
//     xsrfHeaderName: 'X-XSRF-TOKEN',
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     validateStatus: [Function: validateStatus],
//     headers: {
//       Accept: 'application/json, text/plain, */*',
//       'User-Agent': 'axios/0.26.1'
//     },
//     method: 'get',
//     url: 'https://woocommerce-586963-2545520.cloudwaysapps.com/checkout',
//     data: undefined
//   },
//   request: <ref *1> ClientRequest {
//     _events: [Object: null prototype] {
//       abort: [Function (anonymous)],
//       aborted: [Function (anonymous)],
//       connect: [Function (anonymous)],
//       error: [Function (anonymous)],
//       socket: [Function (anonymous)],
//       timeout: [Function (anonymous)],
//       prefinish: [Function: requestOnPrefinish]
//     },
//     _eventsCount: 7,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: false,
//     _last: true,
//     chunkedEncoding: false,
//     shouldKeepAlive: false,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: false,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     _contentLength: 0,
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     socket: TLSSocket {
//       _tlsOptions: [Object],
//       _secureEstablished: true,
//       _securePending: false,
//       _newSessionPending: false,
//       _controlReleased: true,
//       secureConnecting: false,
//       _SNICallback: null,
//       servername: 'woocommerce-586963-2545520.cloudwaysapps.com',
//       alpnProtocol: false,
//       authorized: true,
//       authorizationError: null,
//       encrypted: true,
//       _events: [Object: null prototype],
//       _eventsCount: 10,
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'woocommerce-586963-2545520.cloudwaysapps.com',
//       _readableState: [ReadableState],
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: false,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: undefined,
//       _server: null,
//       ssl: [TLSWrap],
//       _requestCert: true,
//       _rejectUnauthorized: true,
//       parser: null,
//       _httpMessage: [Circular *1],
//       [Symbol(res)]: [TLSWrap],
//       [Symbol(verified)]: true,
//       [Symbol(pendingSession)]: null,
//       [Symbol(async_id_symbol)]: 261,
//       [Symbol(kHandle)]: [TLSWrap],
//       [Symbol(kSetNoDelay)]: false,
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(connect-options)]: [Object],
//       [Symbol(RequestTimeout)]: undefined
//     },
//     _header: 'GET /checkout HTTP/1.1\r\n' +
//       'Accept: application/json, text/plain, */*\r\n' +
//       'User-Agent: axios/0.26.1\r\n' +
//       'Host: woocommerce-586963-2545520.cloudwaysapps.com\r\n' +
//       'Connection: close\r\n' +
//       '\r\n',
//     _keepAliveTimeout: 0,
//     _onPendingData: [Function: noopPendingOutput],
//     agent: Agent {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       defaultPort: 443,
//       protocol: 'https:',
//       options: [Object],
//       requests: {},
//       sockets: [Object],
//       freeSockets: {},
//       keepAliveMsecs: 1000,
//       keepAlive: false,
//       maxSockets: Infinity,
//       maxFreeSockets: 256,
//       scheduling: 'lifo',
//       maxTotalSockets: Infinity,
//       totalSocketCount: 3,
//       maxCachedSessions: 100,
//       _sessionCache: [Object],
//       [Symbol(kCapture)]: false
//     },
//     socketPath: undefined,
//     method: 'GET',
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     path: '/checkout',
//     _ended: true,
//     res: IncomingMessage {
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 4,
//       _maxListeners: undefined,
//       socket: [TLSSocket],
//       httpVersionMajor: 1,
//       httpVersionMinor: 1,
//       httpVersion: '1.1',
//       complete: true,
//       headers: [Object],
//       rawHeaders: [Array],
//       trailers: {},
//       rawTrailers: [],
//       aborted: false,
//       upgrade: false,
//       url: '',
//       method: null,
//       statusCode: 503,
//       statusMessage: 'Service Temporarily Unavailable',
//       client: [TLSSocket],
//       _consuming: false,
//       _dumped: false,
//       req: [Circular *1],
//       responseUrl: 'https://woocommerce-586963-2545520.cloudwaysapps.com/checkout',
//       redirects: [],
//       [Symbol(kCapture)]: false,
//       [Symbol(RequestTimeout)]: undefined
//     },
//     aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: false,
//     host: 'woocommerce-586963-2545520.cloudwaysapps.com',
//     protocol: 'https:',
//     _redirectable: Writable {
//       _writableState: [WritableState],
//       _events: [Object: null prototype],
//       _eventsCount: 3,
//       _maxListeners: undefined,
//       _options: [Object],
//       _ended: true,
//       _ending: true,
//       _redirectCount: 0,
//       _redirects: [],
//       _requestBodyLength: 0,
//       _requestBodyBuffers: [],
//       _onNativeResponse: [Function (anonymous)],
//       _currentRequest: [Circular *1],
//       _currentUrl: 'https://woocommerce-586963-2545520.cloudwaysapps.com/checkout',
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(kCapture)]: false,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//       accept: [Array],
//       'user-agent': [Array],
//       host: [Array]
//     }
//   },
//   response: {
//     status: 503,
//     statusText: 'Service Temporarily Unavailable',
//     headers: {
//       server: 'nginx',
//       date: 'Sun, 10 Apr 2022 12:36:43 GMT',
//       'content-type': 'application/octet-stream',
//       'content-length': '5',
//       connection: 'close'
//     },
//     config: {
//       transitional: [Object],
//       adapter: [Function: httpAdapter],
//       transformRequest: [Array],
//       transformResponse: [Array],
//       timeout: 0,
//       xsrfCookieName: 'XSRF-TOKEN',
//       xsrfHeaderName: 'X-XSRF-TOKEN',
//       maxContentLength: -1,
//       maxBodyLength: -1,
//       validateStatus: [Function: validateStatus],
//       headers: [Object],
//       method: 'get',
//       url: 'https://woocommerce-586963-2545520.cloudwaysapps.com/checkout',
//       data: undefined
//     },
//     request: <ref *1> ClientRequest {
//       _events: [Object: null prototype],
//       _eventsCount: 7,
//       _maxListeners: undefined,
//       outputData: [],
//       outputSize: 0,
//       writable: true,
//       destroyed: false,
//       _last: true,
//       chunkedEncoding: false,
//       shouldKeepAlive: false,
//       _defaultKeepAlive: true,
//       useChunkedEncodingByDefault: false,
//       sendDate: false,
//       _removedConnection: false,
//       _removedContLen: false,
//       _removedTE: false,
//       _contentLength: 0,
//       _hasBody: true,
//       _trailer: '',
//       finished: true,
//       _headerSent: true,
//       socket: [TLSSocket],
//       _header: 'GET /checkout HTTP/1.1\r\n' +
//         'Accept: application/json, text/plain, */*\r\n' +
//         'User-Agent: axios/0.26.1\r\n' +
//         'Host: woocommerce-586963-2545520.cloudwaysapps.com\r\n' +
//         'Connection: close\r\n' +
//         '\r\n',
//       _keepAliveTimeout: 0,
//       _onPendingData: [Function: noopPendingOutput],
//       agent: [Agent],
//       socketPath: undefined,
//       method: 'GET',
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       path: '/checkout',
//       _ended: true,
//       res: [IncomingMessage],
//       aborted: false,
//       timeoutCb: null,
//       upgradeOrConnect: false,
//       parser: null,
//       maxHeadersCount: null,
//       reusedSocket: false,
//       host: 'woocommerce-586963-2545520.cloudwaysapps.com',
//       protocol: 'https:',
//       _redirectable: [Writable],
//       [Symbol(kCapture)]: false,
//       [Symbol(kNeedDrain)]: false,
//       [Symbol(corked)]: 0,
//       [Symbol(kOutHeaders)]: [Object: null prototype]
//     },
//     data: 'break'
//   },
//   isAxiosError: true,
//   toJSON: [Function: toJSON]
// }
// Error: Request failed with status code 503
//     at createError (C:\Users\USER\Documents\projects\Pinggy\Pinggy\node_modules\axios\lib\core\createError.js:16:15)
//     at settle (C:\Users\USER\Documents\projects\Pinggy\Pinggy\node_modules\axios\lib\core\settle.js:17:12)
//     at IncomingMessage.handleStreamEnd (C:\Users\USER\Documents\projects\Pinggy\Pinggy\node_modules\axios\lib\adapters\http.js:322:11)
//     at IncomingMessage.emit (events.js:412:35)
//     at endReadableNT (internal/streams/readable.js:1317:12)
//     at processTicksAndRejections (internal/process/task_queues.js:82:21) {
//   config: {
//     transitional: {
//       silentJSONParsing: true,
//       forcedJSONParsing: true,
//       clarifyTimeoutError: false
//     },
//     adapter: [Function: httpAdapter],
//     transformRequest: [ [Function: transformRequest] ],
//     transformResponse: [ [Function: transformResponse] ],
//     timeout: 0,
//     xsrfCookieName: 'XSRF-TOKEN',
//     xsrfHeaderName: 'X-XSRF-TOKEN',
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     validateStatus: [Function: validateStatus],
//     headers: {
//       Accept: 'application/json, text/plain, */*',
//       'User-Agent': 'axios/0.26.1'
//     },
//     method: 'get',
//     url: 'https://woocommerce-586963-2545520.cloudwaysapps.com/shop',
//     data: undefined
//   },
//   request: <ref *1> ClientRequest {
//     _events: [Object: null prototype] {
//       abort: [Function (anonymous)],
//       aborted: [Function (anonymous)],
//       connect: [Function (anonymous)],
//       error: [Function (anonymous)],
//       socket: [Function (anonymous)],
//       timeout: [Function (anonymous)],
//       prefinish: [Function: requestOnPrefinish]
//     },
//     _eventsCount: 7,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: false,
//     _last: true,
//     chunkedEncoding: false,
//     shouldKeepAlive: false,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: false,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     _contentLength: 0,
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     socket: TLSSocket {
//       _tlsOptions: [Object],
//       _secureEstablished: true,
//       _securePending: false,
//       _newSessionPending: false,
//       _controlReleased: true,
//       secureConnecting: false,
//       _SNICallback: null,
//       servername: 'woocommerce-586963-2545520.cloudwaysapps.com',
//       alpnProtocol: false,
//       authorized: true,
//       authorizationError: null,
//       encrypted: true,
//       _events: [Object: null prototype],
//       _eventsCount: 10,
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'woocommerce-586963-2545520.cloudwaysapps.com',
//       _readableState: [ReadableState],
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: false,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: undefined,
//       _server: null,
//       ssl: [TLSWrap],
//       _requestCert: true,
//       _rejectUnauthorized: true,
//       parser: null,
//       _httpMessage: [Circular *1],
//       [Symbol(res)]: [TLSWrap],
//       [Symbol(verified)]: true,
//       [Symbol(pendingSession)]: null,
//       [Symbol(async_id_symbol)]: 266,
//       [Symbol(kHandle)]: [TLSWrap],
//       [Symbol(kSetNoDelay)]: false,
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(connect-options)]: [Object],
//       [Symbol(RequestTimeout)]: undefined
//     },
//     _header: 'GET /shop HTTP/1.1\r\n' +
//       'Accept: application/json, text/plain, */*\r\n' +
//       'User-Agent: axios/0.26.1\r\n' +
//       'Host: woocommerce-586963-2545520.cloudwaysapps.com\r\n' +
//       'Connection: close\r\n' +
//       '\r\n',
//     _keepAliveTimeout: 0,
//     _onPendingData: [Function: noopPendingOutput],
//     agent: Agent {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       defaultPort: 443,
//       protocol: 'https:',
//       options: [Object],
//       requests: {},
//       sockets: [Object],
//       freeSockets: {},
//       keepAliveMsecs: 1000,
//       keepAlive: false,
//       maxSockets: Infinity,
//       maxFreeSockets: 256,
//       scheduling: 'lifo',
//       maxTotalSockets: Infinity,
//       totalSocketCount: 3,
//       maxCachedSessions: 100,
//       _sessionCache: [Object],
//       [Symbol(kCapture)]: false
//     },
//     socketPath: undefined,
//     method: 'GET',
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     path: '/shop',
//     _ended: true,
//     res: IncomingMessage {
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 4,
//       _maxListeners: undefined,
//       socket: [TLSSocket],
//       httpVersionMajor: 1,
//       httpVersionMinor: 1,
//       httpVersion: '1.1',
//       complete: true,
//       headers: [Object],
//       rawHeaders: [Array],
//       trailers: {},
//       rawTrailers: [],
//       aborted: false,
//       upgrade: false,
//       url: '',
//       method: null,
//       statusCode: 503,
//       statusMessage: 'Service Temporarily Unavailable',
//       client: [TLSSocket],
//       _consuming: false,
//       _dumped: false,
//       req: [Circular *1],
//       responseUrl: 'https://woocommerce-586963-2545520.cloudwaysapps.com/shop',
//       redirects: [],
//       [Symbol(kCapture)]: false,
//       [Symbol(RequestTimeout)]: undefined
//     },
//     aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: false,
//     host: 'woocommerce-586963-2545520.cloudwaysapps.com',
//     protocol: 'https:',
//     _redirectable: Writable {
//       _writableState: [WritableState],
//       _events: [Object: null prototype],
//       _eventsCount: 3,
//       _maxListeners: undefined,
//       _options: [Object],
//       _ended: true,
//       _ending: true,
//       _redirectCount: 0,
//       _redirects: [],
//       _requestBodyLength: 0,
//       _requestBodyBuffers: [],
//       _onNativeResponse: [Function (anonymous)],
//       _currentRequest: [Circular *1],
//       _currentUrl: 'https://woocommerce-586963-2545520.cloudwaysapps.com/shop',
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(kCapture)]: false,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//       accept: [Array],
//       'user-agent': [Array],
//       host: [Array]
//     }
//   },
//   response: {
//     status: 503,
//     statusText: 'Service Temporarily Unavailable',
//     headers: {
//       server: 'nginx',
//       date: 'Sun, 10 Apr 2022 12:36:43 GMT',
//       'content-type': 'application/octet-stream',
//       'content-length': '5',
//       connection: 'close'
//     },
//     config: {
//       transitional: [Object],
//       adapter: [Function: httpAdapter],
//       transformRequest: [Array],
//       transformResponse: [Array],
//       timeout: 0,
//       xsrfCookieName: 'XSRF-TOKEN',
//       xsrfHeaderName: 'X-XSRF-TOKEN',
//       maxContentLength: -1,
//       maxBodyLength: -1,
//       validateStatus: [Function: validateStatus],
//       headers: [Object],
//       method: 'get',
//       url: 'https://woocommerce-586963-2545520.cloudwaysapps.com/shop',
//       data: undefined
//     },
//     request: <ref *1> ClientRequest {
//       _events: [Object: null prototype],
//       _eventsCount: 7,
//       _maxListeners: undefined,
//       outputData: [],
//       outputSize: 0,
//       writable: true,
//       destroyed: false,
//       _last: true,
//       chunkedEncoding: false,
//       shouldKeepAlive: false,
//       _defaultKeepAlive: true,
//       useChunkedEncodingByDefault: false,
//       sendDate: false,
//       _removedConnection: false,
//       _removedContLen: false,
//       _removedTE: false,
//       _contentLength: 0,
//       _hasBody: true,
//       _trailer: '',
//       finished: true,
//       _headerSent: true,
//       socket: [TLSSocket],
//       _header: 'GET /shop HTTP/1.1\r\n' +
//         'Accept: application/json, text/plain, */*\r\n' +
//         'User-Agent: axios/0.26.1\r\n' +
//         'Host: woocommerce-586963-2545520.cloudwaysapps.com\r\n' +
//         'Connection: close\r\n' +
//         '\r\n',
//       _keepAliveTimeout: 0,
//       _onPendingData: [Function: noopPendingOutput],
//       agent: [Agent],
//       socketPath: undefined,
//       method: 'GET',
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       path: '/shop',
//       _ended: true,
//       res: [IncomingMessage],
//       aborted: false,
//       timeoutCb: null,
//       upgradeOrConnect: false,
//       parser: null,
//       maxHeadersCount: null,
//       reusedSocket: false,
//       host: 'woocommerce-586963-2545520.cloudwaysapps.com',
//       protocol: 'https:',
//       _redirectable: [Writable],
//       [Symbol(kCapture)]: false,
//       [Symbol(kNeedDrain)]: false,
//       [Symbol(corked)]: 0,
//       [Symbol(kOutHeaders)]: [Object: null prototype]
//     },
//     data: 'break'
//   },
//   isAxiosError: true,
//   toJSON: [Function: toJSON]
// }