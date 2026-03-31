import { createCanvas, loadImage } from '@napi-rs/canvas';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generate() {
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#111113';
  ctx.fillRect(0, 0, W, H);

  // Subtle gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, 'rgba(34,197,94,0.05)');
  grad.addColorStop(1, 'rgba(168,85,247,0.03)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Load and draw logo
  const logo = await loadImage(resolve(__dirname, '../public/logo.png'));
  const logoSize = 140;
  const logoX = 80, logoY = 170;
  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

  // Title — "DoseGuide" + ".org"
  const titleX = logoX + logoSize + 30;
  const titleY = 260;
  ctx.fillStyle = '#e8e6e3';
  ctx.font = 'bold 72px Georgia, serif';
  const titleW = ctx.measureText('DoseGuide').width;
  ctx.fillText('DoseGuide', titleX, titleY);

  ctx.fillStyle = '#555';
  ctx.font = 'bold 50px Georgia, serif';
  ctx.fillText('.org', titleX + titleW + 4, titleY);

  // Subtitle
  ctx.fillStyle = '#8a8780';
  ctx.font = '30px Georgia, serif';
  ctx.fillText('Evidence-based harm reduction', titleX, titleY + 50);

  // Stats
  ctx.font = '20px monospace';
  ctx.fillStyle = '#6b6860';
  ctx.fillText('25+ substances  ·  drug interactions  ·  safety margins  ·  sourced research', titleX, titleY + 110);

  // Tagline
  ctx.fillStyle = '#c4a050';
  ctx.font = '20px monospace';
  ctx.fillText('Know what you\'re taking. Always test your substances.', titleX, titleY + 160);

  // Bottom accent line
  const accentGrad = ctx.createLinearGradient(0, H - 4, W, H - 4);
  accentGrad.addColorStop(0, '#22c55e');
  accentGrad.addColorStop(0.5, '#a855f7');
  accentGrad.addColorStop(1, '#ef4444');
  ctx.fillStyle = accentGrad;
  ctx.fillRect(0, H - 4, W, 4);

  const buf = canvas.toBuffer('image/png');
  writeFileSync(resolve(__dirname, '../public/og-image.png'), buf);
  console.log('Generated public/og-image.png (1200x630)');
}

generate().catch(console.error);
