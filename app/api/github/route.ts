import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const res = await fetch('https://github-contributions-api.jogruber.de/v4/arpankanwer?y=last', {
      headers: {
        'User-Agent': 'Portfolio-App',
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error fetching live GitHub contributions:', error);
  }

  // Fallback to locally cached actual data
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'github-contributions.json');
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return NextResponse.json(JSON.parse(fileData));
    }
  } catch (e) {
    console.error('Error reading fallback GitHub contributions:', e);
  }

  return NextResponse.json({ total: { lastYear: 3396 }, contributions: [] });
}
