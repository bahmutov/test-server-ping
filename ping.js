const got = require('got')
console.log('node ping')

const url = 'http://localhost:5000'
got(url, {
  retry: {
    retries (retry, error) {
      console.error(error.method, error.host, error.code)
      return 1000
    }
  }
}).then(() => {
  console.log('success pinging', url)
}, (e) => {
  console.error('error')
  console.error(e)
})
