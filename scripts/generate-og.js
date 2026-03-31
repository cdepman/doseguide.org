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
  ctx.fillStyle = '#151517';
  ctx.fillRect(0, 0, W, H);

  // No gradient — match logo background exactly

  // Load and draw logo
  const logo = await loadImage(resolve(__dirname, '../public/logo.png'));
  const logoSize = 200;
  const logoPadding = 10; // logo has ~10px internal padding before content starts
  const blockH = 250;
  const topY = (H - blockH) / 2;

  // Title — "DoseGuide" + ".org"
  const titleX = 80 + logoSize + 20;
  const titleY = topY + 90;

  // Logo top aligned with text top, offset by internal padding so the icons align
  // Text ascent for 72px Georgia bold is ~55px above baseline
  const logoX = 80, logoY = titleY - 55 - logoPadding;
  ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
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
