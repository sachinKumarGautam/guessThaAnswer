/* eslint-disable no-console */

import chokidar from 'chokidar';

export const purgeCacheOnChange = path => {
  const watcher = chokidar.watch(path, {
    ignoreInitial: true,
    ignored: /\/(node_modules|build)\//
  });

  watcher.on('ready', () => {
    watcher.on('all', async () => {
      console.log('Reloading server...');
      Object.keys(require.cache).forEach(id => {
        if (/[/\\](src|server)[/\\]/.test(id)) {
          delete require.cache[id];
        }
      });
    });
  });
};
