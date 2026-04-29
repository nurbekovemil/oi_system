const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts } = require('pdf-lib');

function wrapText(text, font, fontSize, maxWidth) {
  const lines = [];
  const rawLines = text.split('\n');

  for (const rawLine of rawLines) {
    const words = rawLine.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);

      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }

    lines.push(currentLine || '');
  }

  return lines;
}

async function textToPdfBase64(text) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 10;
  const lineHeight = 12;
  const maxWidth = page.getWidth() - 60;
  const wrappedLines = wrapText(text, font, fontSize, maxWidth);

  let y = page.getHeight() - 40;
  for (const line of wrappedLines) {
    if (y < 40) {
      page = pdfDoc.addPage();
      y = page.getHeight() - 40;
    }
    page.drawText(line, { x: 30, y, size: fontSize, font });
    y -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();
  return {
    pdfBytes,
    base64: Buffer.from(pdfBytes).toString('base64'),
  };
}

async function main() {
  const text = [
    'Text preview from txt',
    '{"reportId":123,"company":"Demo","sum":2500.55,"ok":true}',
    'Long text line Long text line Long text line Long text line Long text line Long text line',
  ].join('\n');

  const { pdfBytes, base64 } = await textToPdfBase64(text);
  const outDir = path.join(__dirname);
  const pdfPath = path.join(outDir, 'eds-text-preview.pdf');
  const b64Path = path.join(outDir, 'eds-text-preview.base64.txt');

  fs.writeFileSync(pdfPath, Buffer.from(pdfBytes));
  fs.writeFileSync(b64Path, base64);

  console.log(`PDF: ${pdfPath}`);
  console.log(`Base64: ${b64Path}`);
  console.log(`PDF bytes: ${pdfBytes.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
