const fs = require('fs');
const statuses = ['INFO', 'WARNING', 'ERROR']

//make an array of random sentences to so the log entries have a natural varied appearance.
// sentences were sourced from an online random business text generator
const text = fs.readFileSync('./server/random-text.txt')
  .toString()
  .split('.')
  .map(line => line.trim())
/**
 * random delay upto 3 seconds
 * @returns {Promise<unknown>}
 */
const randomDelay = () => new Promise((resolve => setTimeout(() => resolve(),(Math.random() * 3)  * 1000)))
/**
 * get a random entry from the list of sentances
 * @returns {string}
 */
const randomText = () => text[Math.floor(Math.random() * text.length)]
/**
 * Writes to the log file at random intervals, simulating what a service may produce
 * @param logLocation
 * @returns {Promise<void>}
 */
module.exports = async (logLocation) => {
  while(true) {


    const dateString = (new Date()).toISOString().split('.')[0].replace('T', ' ')
    fs.appendFileSync(logLocation, `${dateString}, 944 ${statuses[Math.floor((Math.random() * 3))]} ${randomText()} \n`);
    await randomDelay()
  }
}

