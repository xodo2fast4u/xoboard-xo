import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { APK_FILENAME, apkPath } from '@/lib/apk';
import { withApi } from '@/lib/api';
import { env } from '@/lib/env';
import { AppError, problems } from '@/lib/errors';
import { logger } from '@/lib/logger';

export const GET = withApi('downloads.xoboard', async (_request, ctx) => {
  const file = apkPath();
  let sizeBytes: number;
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error('apk path does not point to a regular file');
    sizeBytes = info.size;
  } catch (error) {
    throw new AppError(problems.fileUnavailable, { cause: error });
  }

  const stream = Readable.toWeb(createReadStream(file)) as unknown as ReadableStream<Uint8Array>;

  logger.audit('download.apk.served', {
    requestId: ctx.requestId,
    ip: ctx.ip,
    route: ctx.route,
    file: APK_FILENAME,
    bytes: sizeBytes,
    version: env().XOBOARD_VERSION,
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Length': String(sizeBytes),
      'Content-Disposition': `attachment; filename="${APK_FILENAME}"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
});
