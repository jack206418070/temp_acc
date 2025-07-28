import { defineEventHandler, setCookie, createError } from 'file://C:/Users/c3d19/accompany-web-site/node_modules/h3/dist/index.mjs';

const captcha = defineEventHandler(async (event) => {
  try {
    const code = Math.random().toString().slice(2, 6);
    const svg = `
      <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="40" fill="#f0f0f0"/>
        ${generateNoise()}
        ${generateText(code)}
      </svg>
    `;
    setCookie(event, "captcha", code, { httpOnly: true, path: "/" });
    event.node.res.setHeader("Content-Type", "image/svg+xml");
    event.node.res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    event.node.res.setHeader("Pragma", "no-cache");
    event.node.res.setHeader("Expires", "0");
    return svg;
  } catch (error) {
    console.error("Captcha generation error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate captcha"
    });
  }
});
function generateNoise() {
  let noise = "";
  for (let i = 0; i < 5; i++) {
    const x1 = Math.floor(Math.random() * 120);
    const y1 = Math.floor(Math.random() * 40);
    const x2 = Math.floor(Math.random() * 120);
    const y2 = Math.floor(Math.random() * 40);
    noise += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#999" stroke-width="1"/>`;
  }
  for (let i = 0; i < 30; i++) {
    const x = Math.floor(Math.random() * 120);
    const y = Math.floor(Math.random() * 40);
    noise += `<circle cx="${x}" cy="${y}" r="1" fill="#999"/>`;
  }
  return noise;
}
function generateText(code) {
  let text = "";
  for (let i = 0; i < code.length; i++) {
    const x = 20 + i * 25;
    const y = 25;
    const rotate = Math.random() * 30 - 15;
    text += `<text x="${x}" y="${y}" transform="rotate(${rotate} ${x} ${y})" font-family="Arial" font-size="20" fill="#333">${code[i]}</text>`;
  }
  return text;
}

export { captcha as default };
//# sourceMappingURL=captcha.mjs.map
