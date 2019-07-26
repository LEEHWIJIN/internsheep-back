module.exports = (function () {
  return {
    local: { // localhost
      host: '54.180.173.242',
      port: '3306',
      user: 'root',
      password: 'Dlsxjstnlq1!',
      database: 'capstone',
      multipleStatements : true
      
    },
    real: { // real server db info
      host: '',
      port: '',
      user: '',
      password: '!',
      database: ''
    },
    dev: { // dev server db info
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
})();
