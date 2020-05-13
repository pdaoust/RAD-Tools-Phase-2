const fs = require('fs')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const { promiseMapOverObject, toSnakeCase } = require('../../utils.js')
const renderMod = require('./render-entry-module')
const renderHandlers = require('./render-entry-handlers')
const renderValidation = require('./render-entry-validation')
const renderEntryTest = require('./render-entry-test')
const chalk = require('chalk')

async function createEntryDir(zomeName, entryName) {
  const { stdout, stderr } = await exec(`cd dna-src/zomes/${zomeName}/code/src; [ ! -d ${entryName} ] && mkdir ${entryName}; cd ${entryName} && echo $(pwd -P)`)
  if(stderr) console.error('stderr:', stderr)
  return stdout.trim()
}

async function createEntryTestDir(entryName) {
  let {stdout, stderr } = await exec(`cd dna-src/test; [ ! -d ${entryName} ] && mkdir ${entryName}; cd ${entryName} && echo $(pwd -P)`)
  if (stderr) console.error('stderr:', stderr)
  return stdout.trim()
}

const renderers = [
  [renderMod, 'mod'],
  [renderHandlers, 'handlers'],
  [renderValidation, 'validation'],
  [renderEntryTest, 'index']
]

const renderEntry = async (zomeEntryType, zomeEntry, zomeName) => {
  const zomeEntryName = toSnakeCase(zomeEntryType).toLowerCase()
  const ZOME_ENTRY_PATH = await createEntryDir(zomeName, zomeEntryName)
  const TEST_PATH = await createEntryTestDir(zomeEntryName)
  const resolvePath = fileName => fileName === 'index' ? `${TEST_PATH}/${fileName}.js` : `${ZOME_ENTRY_PATH}/${fileName}.rs`

  renderers.forEach(([renderFunction, filename]) => fs.writeFileSync(resolvePath(filename), renderFunction(zomeEntryName, zomeEntry, zomeName)))
  return console.log(`${chalk.cyan(' Finished creating ' + zomeEntryName.toLowerCase() + ' entry')}\n`)
}

const generateZomeEntries = (zomeName, zomeEntryTypes) => promiseMapOverObject(zomeEntryTypes, (zomeEntryType, zomeEntry) => renderEntry(zomeEntryType, zomeEntry, zomeName))

module.exports = generateZomeEntries
