const got = require('got')
console.log('node ping')

const ping = (url, timeout) => {
  const start = +new Date()
  return got(url, {
    retry: {
      retries (retry, error) {
        const now = +new Date()
        console.error(now - start, 'ms', error.method, error.host, error.code)
        if (now - start > timeout) {
          console.error('timed out')
          return 0
        }
        return 1000
      }
    }
  })
}

const url = 'http://localhost:5000'
const timeout = 5000
ping(url, timeout).then(
  () => {
    console.log('success pinging', url)
  },
  e => {
    console.error('error', e.method, e.host, e.code)
    process.exit(1)
  }
)
