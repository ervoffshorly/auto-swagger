const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

function getApiRoutes(folderPath) {
  let routes = [];
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      routes.push(...getApiRoutes(filePath));
    } else if (path.extname(filePath) === '.js') {
      const content = fs.readFileSync(filePath, 'utf-8');
      const regex = /router\.([a-z]+)\(['"`](.*?)['"`],\s?(.*?)\)/g;
      let regMatch;
      while ((regMatch = regex.exec(content))) {
        const method = regMatch[1];
        const endpoint = regMatch[2];
        const functionName = regMatch[3];
        routes = [...routes, { method, endpoint, functionName }];
      }

      const contentRegex =
        /(.*?)async\s+\(.*?\)\s*=>\s*\{((?:[^{}]|{(?:[^{}]|{(?:[^{}]|{[^{}]*})*})*})*})/g;
      const functionBody = [...content.matchAll(contentRegex)].map(
        (match) => match[0]
      );
    }
  });
  return routes;
}

app.get('/folder-framework', (req, res) => {
  const folderPath = req.query.folderPath;
  const files = fs.readdirSync(folderPath);
  let framework;
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
      if (fs.existsSync(path.join(filePath, 'package.json'))) {
        const pkg = require(path.join(filePath, 'package.json'));
        if (
          pkg.dependencies &&
          (pkg.dependencies.express || pkg.dependencies['@types/express'])
        ) {
          framework = 'express';
        }
      }
    }
  });
  const apiRoutes = getApiRoutes(folderPath);
  res.json({ framework, apiRoutes });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
