import { stat } from 'node:fs/promises';
import path from 'node:path';
import { env } from '@/lib/env';

export const APK_FILENAME = 'Xoboard.apk';

export function apkPath(): string {
  const configured = env().XOBOARD_APK_PATH;
  const fileName = path.basename(configured);
  return path.join(process.cwd(), 'downloads', fileName);
}

export type ApkInfo =
  { available: true; version: string; sizeBytes: number } | { available: false; version: string };

export async function getApkInfo(): Promise<ApkInfo> {
  const version = env().XOBOARD_VERSION;
  try {
    const info = await stat(apkPath());
    if (!info.isFile()) return { available: false, version };
    return { available: true, version, sizeBytes: info.size };
  } catch {
    return { available: false, version };
  }
}
