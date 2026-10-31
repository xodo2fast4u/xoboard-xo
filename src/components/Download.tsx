import { getApkInfo } from '@/lib/apk';
import DownloadUI from '@/components/DownloadUI';

export default async function Download() {
  const apk = await getApkInfo();
  return <DownloadUI apk={apk} />;
}
