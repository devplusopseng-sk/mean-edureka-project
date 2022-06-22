export const environment = {
  production: true,
  // api : window['env']['apiUrl'] || 'default',
  api : 'http://localhost:8080/',
  VERSION: require('../../package.json').version
};
