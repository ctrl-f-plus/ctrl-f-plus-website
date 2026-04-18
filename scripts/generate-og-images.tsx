import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import { loadEnvConfig } from '@next/env';
import satori from 'satori';
import sharp from 'sharp';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function main() {
  const projectDir = process.cwd();

  // Match `next build` env resolution so local builds pick up `.env.local`
  // without needing a separate wrapper script.
  loadEnvConfig(projectDir, false);

  const { getPublishedPosts } = await import('../src/lib/posts');

  const outDir = path.join(projectDir, 'public/og');
  fs.mkdirSync(outDir, { recursive: true });

  const interBold = fs.readFileSync(
    path.join(
      projectDir,
      'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff',
    ),
  );

  const posts = getPublishedPosts();

  for (const post of posts) {
    const svg = await satori(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#94a3b8',
            marginBottom: 20,
          }}
        >
          ctrl-f.plus/blog
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.2,
            maxWidth: '90%',
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#64748b',
            marginTop: 30,
          }}
        >
          By {post.author}
        </div>
      </div>,
      {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        fonts: [
          {
            name: 'Inter',
            data: interBold,
            weight: 700,
            style: 'normal' as const,
          },
        ],
      },
    );

    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    const outPath = path.join(outDir, `${post.slug}.png`);
    fs.writeFileSync(outPath, pngBuffer);
    console.log(`Generated: ${outPath}`);
  }

  console.log(`Done. Generated ${posts.length} OG images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
