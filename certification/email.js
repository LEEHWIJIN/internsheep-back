module.exports = (function () {
  return {
    test: { // test mail adress  
      service: 'Gmail',
      auth: {
          user: 'internsheep2019@gmail.com',
          pass: 'dlsxjstnlq1!'
      }
    },
    real: { // real mail adress
      service: '',
      auth: {
          user: '',
          pass: ''
      }
    },
    dev: { // dev mail adress
      service: '',
      auth: {
          user: '',
          pass: ''
      }
    }
  }
})();