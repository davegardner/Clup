// Commandline interface to sidecar
const cla = require("command-line-args")
const clup = require('./clup.js')

// some default values
const defaultExclusions = ['.git', '_site', 'node_modules', 'photoswipe', 'src', '.vscode']
const defaultIncludes = ['.jpg', '.jpeg']

// command line defn
const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'root', type: String, multiple: false, defaultOption: true, defaultValue: '.' },
    { name: "excludeDirs", alias: 'x', type: String, multiple: true, defaultValue: defaultExclusions },
    { name: "includeExts", alias: 'i', type: String, multiple: true, defaultValue: defaultIncludes },
    { name: "overwrite", alias: 'o', type: Boolean, defaultValue: false},
    { name: "overwriteOnlyIfEmpty", alias: 'e', type: Boolean, defaultValue: true}, // only applies if overwrite is false
    { name: "dryRun", alias: 'd', type: Boolean, defaultValue: false},
    { name: "sidecarExt", alias: 's', type:String, defaultValue: ".sqip.json"}
]

// process the commandline
const options = cla(optionDefinitions)

// show what we're going to do
console.log(`clup:`)
// console.log(`   src: ${options.src}`)
console.log(`   verbose: ${options.verbose}`)
console.log(`   root: ${options.root}`)
console.log(`   excludeDirs: ${options.excludeDirs}`)
console.log(`   includeExts: ${options.includeExts}`)
console.log(`   overwrite: ${options.overwrite}`)
console.log(`   overwriteOnlyIfEmpty: ${options.overwriteOnlyIfEmpty}`)
console.log(`   dryRun: ${options.dryRun}`)
console.log(`   sidecarExt: ${options.sidecarExt}`)

const startTime = new Date()

clup.buildDb(options)

const elapsed = (new Date() - startTime) / 1000

console.log(`Clup finished in ${elapsed} seconds`)


