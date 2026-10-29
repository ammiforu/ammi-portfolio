import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const CHANNEL_ID = 'UChUzUL8igu2TyaakhbZxlww'; // @ammiexplains

interface StatsResponse {
  subscribers: number;
  total_views: number;
  video_count: number;
  weekly_views?: number;
  weekly_watch_hours?: number;
  generated_at: string;
  source: 'live_youtube_api' | 'daily_snapshot' | 'fallback_baseline';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept GET or HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Edge cache: 30 minutes fresh on Vercel CDN, serve stale up to 24 hours while revalidating
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');

  let snapshotData: any = null;
  try {
    const dailyPath = path.join(process.cwd(), 'public', 'analytics', 'ammi_explain_daily.json');
    if (fs.existsSync(dailyPath)) {
      snapshotData = JSON.parse(fs.readFileSync(dailyPath, 'utf-8'));
    }
  } catch (err) {
    // Non-fatal, proceed
  }

  // 1. Try real-time YouTube Data API v3 if key is available
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (apiKey) {
    try {
      const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`;
      const ytRes = await fetch(apiUrl);
      if (ytRes.ok) {
        const json = await ytRes.json();
        const stats = json.items?.[0]?.statistics;
        if (stats) {
          const payload: StatsResponse = {
            subscribers: parseInt(stats.subscriberCount || '0', 10),
            total_views: parseInt(stats.viewCount || '0', 10),
            video_count: parseInt(stats.videoCount || '0', 10),
            weekly_views: snapshotData?.windows?.['7d']?.views ?? 0,
            weekly_watch_hours: Math.round(snapshotData?.windows?.['7d']?.watch_time_hours ?? 0),
            generated_at: new Date().toISOString(),
            source: 'live_youtube_api',
          };
          return res.status(200).json(payload);
        }
      }
    } catch (e) {
      // Fall through to snapshot data
    }
  }

  // 2. Fall back to synced daily snapshot
  if (snapshotData?.channel) {
    const payload: StatsResponse = {
      subscribers: snapshotData.channel.subscribers ?? 0,
      total_views: snapshotData.channel.total_views ?? 0,
      video_count: snapshotData.channel.video_count ?? 0,
      weekly_views: snapshotData.windows?.['7d']?.views ?? 0,
      weekly_watch_hours: Math.round(snapshotData.windows?.['7d']?.watch_time_hours ?? 0),
      generated_at: snapshotData.generated_at ?? new Date().toISOString(),
      source: 'daily_snapshot',
    };
    return res.status(200).json(payload);
  }

  // 3. Fallback baseline
  return res.status(200).json({
    subscribers: 1720,
    total_views: 685036,
    video_count: 111,
    weekly_views: 3558,
    weekly_watch_hours: 35,
    generated_at: new Date().toISOString(),
    source: 'fallback_baseline',
  });
}
