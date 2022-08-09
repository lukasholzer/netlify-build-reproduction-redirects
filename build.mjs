// @ts-check

import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';

const tmpl = (txt) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    ${txt}
  </body>
</html>
`;

await rm('dist', { recursive: true, force: true });

await mkdir('dist/de-de', { recursive: true });
await mkdir('dist/en-us', { recursive: true });

await Promise.all([
  writeFile('dist/index.html', tmpl('<h1>Main</h1>')),
  writeFile('dist/de-de/index.html', tmpl('<h1>Hallo Grüß dich!</h1>')),
  writeFile('dist/en-us/index.html', tmpl('<h1>Hello world!</h1>')),
]);

// mimic CopyWebpackPlugin

await Promise.all([
  copyFile('_redirects', 'dist/_redirects'),
  copyFile('netlify.toml', 'dist/netlify.toml'),
]);
