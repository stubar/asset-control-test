const readline = require('readline')
const fs = require('fs')

/**
 * Uses a stream to read from a specific line of the log file
 * @param n line to start returning from
 * @param filepath
 * @param len how many lines to return
 * @returns {Promise<unknown>}
 */
module.exports = (n, filepath, len = 1) => {
  return new Promise((resolve, reject) => {
    if (n < 0 || n % 1 !== 0)
      return reject(new RangeError(`Invalid line number`))

    let cursor = 0
    const input = fs.createReadStream(filepath)
    const rl = readline.createInterface({ input })
    const output = []// for building a list of log lines to be returned

    rl.on('line', function(line) {
      if (cursor++ >= n) {
        // parse the status from the line
        const status = ['INFO', 'WARNING', 'ERROR'].find(status => line.includes(status))
        output.push({line, status})
        if(output.length === len){
          close()
        }

      }
    })

    rl.on('error', reject)

    input.on('end', close)
    function close() {
      rl.close()
      rl.removeAllListeners()
      input.close()
      resolve(output)
    }
  })
}
