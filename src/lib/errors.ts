export type Problem = {
  status: number;
  code: string;
  what: string;
  why: string;
  action: string;
};

type Options = { cause?: unknown; headers?: Record<string, string> };

export class AppError extends Error {
  readonly problem: Problem;
  readonly headers: Record<string, string>;

  constructor(problem: Problem, options: Options = {}) {
    super(problem.code, { cause: options.cause });
    this.name = 'AppError';
    this.problem = problem;
    this.headers = options.headers ?? {};
  }
}

export const problems = {
  notFound: {
    status: 404,
    code: 'not_found',
    what: 'This page could not be found.',
    why: 'The address may be mistyped or outdated or the page was moved.',
    action: 'Check the address or return to the home page.',
  } satisfies Problem,
  methodNotAllowed: {
    status: 405,
    code: 'method_not_allowed',
    what: 'This action is not supported here.',
    why: 'This endpoint only accepts GET and HEAD requests.',
    action: 'Send a GET request to read this resource.',
  } satisfies Problem,
  originNotAllowed: {
    status: 403,
    code: 'origin_not_allowed',
    what: 'This request was blocked.',
    why: 'It came from a website that is not allowed to call this API.',
    action:
      'Call the API from the official Xoboard website or from a tool that does not send a browser origin.',
  } satisfies Problem,
  missingUserAgent: {
    status: 403,
    code: 'client_identity_missing',
    what: 'This request was blocked.',
    why: 'Requests without a User-Agent header are treated as automated traffic.',
    action: 'Add a User-Agent header that identifies your client, then try again.',
  } satisfies Problem,
  suspiciousClient: {
    status: 403,
    code: 'client_rejected',
    what: 'This request was blocked.',
    why: 'The client looks like an automated security scanner.',
    action:
      'Use a regular client to call the API. If you are running a security test, contact the maintainers first.',
  } satisfies Problem,
  payloadTooLarge: {
    status: 413,
    code: 'payload_too_large',
    what: 'The request body is too large.',
    why: 'The request is bigger than this endpoint accepts.',
    action: 'Remove unnecessary data and send a smaller request.',
  } satisfies Problem,
  fileUnavailable: {
    status: 404,
    code: 'download_unavailable',
    what: 'The Xoboard APK is not available right now.',
    why: 'The release file is missing on this server.',
    action: 'Try again later or get the latest release from the project repository.',
  } satisfies Problem,
  upstreamUnavailable: {
    status: 503,
    code: 'upstream_unavailable',
    what: 'Project statistics are not available right now.',
    why: 'The code hosting service did not answer in time after several attempts.',
    action: 'Try again in a few minutes. The rest of the page works normally.',
  } satisfies Problem,
  internal: {
    status: 500,
    code: 'internal_error',
    what: 'Something went wrong on our side.',
    why: 'An unexpected problem stopped this request from finishing.',
    action:
      'Try again in a few minutes. If it keeps happening, contact support and include your request ID.',
  } satisfies Problem,
  blocked: (seconds: number): Problem => ({
    status: 403,
    code: 'access_temporarily_blocked',
    what: 'Requests from your connection are paused.',
    why: 'Too many rejected or suspicious requests were sent in a short time.',
    action: `Wait about ${Math.max(1, Math.ceil(seconds / 60))} minute(s), then try again. If you think this is a mistake, contact support with your request ID.`,
  }),
  rateLimited: (seconds: number): Problem => ({
    status: 429,
    code: 'rate_limited',
    what: 'You are sending requests too quickly.',
    why: 'Your connection went over the limit for this part of the site.',
    action: `Wait ${seconds} second(s), then try again.`,
  }),
  invalidInput: (details: string): Problem => ({
    status: 422,
    code: 'invalid_input',
    what: 'Some values in your request are not valid.',
    why: `The server found these problems: ${details}.`,
    action: 'Correct the values listed above and send the request again.',
  }),
};

export function toProblem(error: unknown): Problem {
  return error instanceof AppError ? error.problem : problems.internal;
}

export function problemResponse(
  problem: Problem,
  requestId: string,
  headers: Record<string, string> = {},
): Response {
  return new Response(
    JSON.stringify({
      error: {
        status: problem.status,
        code: problem.code,
        what: problem.what,
        why: problem.why,
        action: problem.action,
        requestId,
      },
    }),
    {
      status: problem.status,
      headers: {
        'Content-Type': 'application/problem+json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Request-Id': requestId,
        ...headers,
      },
    },
  );
}
