// Commandline interface to clup
const cla = require("command-line-args")
const clup = require('./clup.js')
const help = require("./help.js")

// some default values
const defaultPrefix = 'Slog/Media'
const defaultType = 'upload'
const defaultFilename = './_data/cloudinaryResources.json'
// command line defn
const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false },
    { name: 'prefix', alias: 'p', type: String, defaultValue: defaultPrefix },
    { name: 'output', type: String, defaultValue: defaultFilename, defaultOption: true },
    { name: "dryRun", alias: 'd', type: Boolean, defaultValue: false },
    { name: "type", alias: 't', type: String, defaultValue: defaultType },
    { name: "help", alias: 'h', type: Boolean }
]

// process the commandline
const options = cla(optionDefinitions)

if (options.help) {
    help.display();
}
else {
    // show what we're going to do
    console.log(`clup:`)
    console.log(`   prefix: ${options.prefix}`)
    console.log(`   verbose: ${options.verbose}`)
    console.log(`   output: ${options.output}`)
    console.log(`   type: ${options.type}`)
    console.log(`   dryRun: ${options.dryRun}`)

    // do it
    clup.buildDb(options)

}




