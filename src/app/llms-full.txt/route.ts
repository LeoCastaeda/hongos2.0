import { buildLlmsFullTxt } from '@/lib/llms-txt';

export const runtime = 'edge';

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  return new Response(buildLlmsFullTxt(origin), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
