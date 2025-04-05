/**
 * Object containing common HTTP status codes for use in web development.
 *
 * @typedef {Object} HttpStatusCodes
 * @property {number} OK - Standard response for successful HTTP requests.
 * @property {number} CREATED - The request has been fulfilled, resulting in the creation of a new resource.
 * @property {number} ACCEPTED - The request has been accepted for processing, but the processing has not been completed.
 * @property {number} NO_CONTENT - The server successfully processed the request but there is no content to send.
 * @property {number} MOVED_PERMANENTLY - This and all future requests should be directed to the given URI.
 * @property {number} FOUND - The requested resource has been temporarily moved to a different URI.
 * @property {number} SEE_OTHER - The response to the request can be found under a different URI.
 * @property {number} NOT_MODIFIED - Indicates that the resource has not been modified since the version specified by the request headers.
 * @property {number} TEMPORARY_REDIRECT - Tells the client to look at (browse) another URL.
 * @property {number} BAD_REQUEST - The server cannot or will not process the request due to an apparent client error.
 * @property {number} UNAUTHORIZED - Similar to 403 Forbidden, but specifically for authentication.
 * @property {number} FORBIDDEN - The client does not have the necessary permission.
 * @property {number} NOT_FOUND - The server cannot find the requested resource.
 * @property {number} METHOD_NOT_ALLOWED - A request method is not supported for the requested resource.
 * @property {number} NOT_ACCEPTABLE - The server cannot produce a response matching the list of acceptable values defined in the request's headers.
 * @property {number} PROXY_AUTHENTICATION_REQUIRED - The client must first authenticate itself with the proxy.
 * @property {number} REQUEST_TIMEOUT - The server timed out waiting for the request.
 * @property {number} CONFLICT - Indicates that the request could not be processed because of conflict in the request.
 * @property {number} GONE - Indicates that the requested resource is no longer available and will not be available again.
 * @property {number} LENGTH_REQUIRED - The server requires the content-length in the request.
 * @property {number} PRECONDITION_FAILED - The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.
 * @property {number} PAYLOAD_TOO_LARGE - The server is refusing to process a request because the request payload is larger than the server is willing or able to process.
 * @property {number} UNSUPPORTED_MEDIA_TYPE - The server is refusing to service the request because the payload format is in an unsupported format.
 * @property {number} RANGE_NOT_SATISFIABLE - The server cannot provide the requested range.
 * @property {number} EXPECTATION_FAILED - The server cannot meet the requirements of the Expect request-header field.
 * @property {number} IM_A_TEAPOT - A code returned by teapots requested to brew coffee.
 * @property {number} MISDIRECTED_REQUEST - The request was directed at a server that is not able to produce a response.
 * @property {number} UNPROCESSABLE_ENTITY - The server understands the content type of the request entity but was unable to process the contained instructions.
 * @property {number} LOCKED - The resource that is being accessed is locked.
 * @property {number} FAILED_DEPENDENCY - The request failed due to failure of a previous request.
 * @property {number} TOO_EARLY - Indicates that the server is unwilling to risk processing a request that might be replayed.
 * @property {number} UPGRADE_REQUIRED - The client should switch to a different protocol such as TLS/1.0.
 * @property {number} PRECONDITION_REQUIRED - The origin server requires the request to be conditional.
 * @property {number} TOO_MANY_REQUESTS - The user has sent too many requests in a given amount of time.
 * @property {number} REQUEST_HEADER_FIELDS_TOO_LARGE - The server is unwilling to process the request because its header fields are too large.
 * @property {number} UNAVAILABLE_FOR_LEGAL_REASONS - A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.
 * @property {number} INTERNAL_SERVER_ERROR - A generic error message returned when an unexpected condition was encountered by the server.
 * @property {number} NOT_IMPLEMENTED - The server either does not recognize the request method, or it lacks the ability to fulfill the request.
 * @property {number} BAD_GATEWAY - The server, while acting as a gateway or proxy, received an invalid response from an inbound server.
 * @property {number} SERVICE_UNAVAILABLE - The server is not ready to handle the request. Common causes are a server that is down for maintenance or is overloaded.
 * @property {number} GATEWAY_TIMEOUT - The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server or some other auxiliary server it needed to access in order to complete the request.
 * @property {number} HTTP_VERSION_NOT_SUPPORTED - The server does not support the HTTP protocol version that was used in the request.
 * @property {number} VARIANT_ALSO_NEGOTIATES - Transparent content negotiation for the request results in a circular reference.
 * @property {number} INSUFFICIENT_STORAGE - The server is unable to store the representation needed to complete the request.
 * @property {number} LOOP_DETECTED - The server detected an infinite loop while processing a request.
 * @property {number} NOT_EXTENDED - Further extensions to the request are required for the server to fulfill it.
 * @property {number} NETWORK_AUTHENTICATION_REQUIRED - The client needs to authenticate to gain network access.
 */
exports.STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
  };