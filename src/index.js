if (browserSupportsAllFeatures()) {
  runMain();
} else {
  //@ts-ignore
  loadScript(window.__ASSET_MANIFEST__['polyfills.js'], runMain);
}

function runMain() {
  const { main } = require('./main');
  main();
}

function browserSupportsAllFeatures() {
  return window.Promise && Object.assign;
}

//@ts-ignore
function loadScript(src, done) {
  const script = document.createElement('script');

  script.src = src;
  script.onload = () => {
    done();
  };
  script.onerror = () => {
    done(new Error('Failed to load script ' + src));
  };

  document.head.appendChild(script);
}
