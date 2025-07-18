import fs from 'fs';
import { SwaggerTheme } from 'swagger-themes';

// Remove explicit version argument (deprecated)
const theme = new SwaggerTheme();

// Use only valid theme names (check with theme.getThemes() if unsure)
const themes = ['dark', 'flattop', 'feeling-blue']; // example valid themes

// Create directory if not exists
if (!fs.existsSync('./public/swagger-themes')) {
  fs.mkdirSync('./public/swagger-themes', { recursive: true });
}

// Generate CSS files for each theme
themes.forEach((name) => {
  const cssBuffer = theme.getBuffer(name);
  fs.writeFileSync(`./public/swagger-themes/${name}.css`, cssBuffer);
  console.log(`Generated: ${name}.css`);
});
