// help
const commandLineUsage = require('command-line-usage')

const sections = [
    {
        header: 'clup <output file> ...',
        content: `Utility to cache Cloudinary image metadata locally as a json database, thus making it easily and rapidly accessible during website development, especially when using eleventy.
        You must set the Cloudinary API environment variable before running.
        See your Cloudinary dashboard for details. `
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'output',
                typeLabel: '{underline file}',
                type: String,
                defaultOption: './_data/cloudinaryResources.json',
                description: 'The json file to generate.'
            },
            { 
                name: 'verbose',
                alias: 'v',
                type: Boolean,
                defaultOption: false,
                description: 'Log resource info to console as it is downloaded (defaults to false)'
            },
            { 
                name: 'prefix',
                alias: 'p',
                type: String,  
                defaultValue : "Slog/Media",
                description: 'Path to the folder to be downloaded (defaults to "Slog/Media"'
            },
            {
                name: 'dryRun',
                alias: 'd',
                type: Boolean, 
                defaultValue: false,
                description: 'When set do not create any output (defaults to false)'
            },
            {
                name: 'type',
                alias: 't',
                type: String,  
                defaultValue : "upload",
                description: 'The Cloudinary resource type (defaults to "upload")'
            },
            {
                name: 'help',
                alias: 'h',
                type: Boolean,
                description: 'Print this usage guide.'
            }
        ]
    }
]

function help() {
    const usage = commandLineUsage(sections)
    console.log(usage)
}

exports.display = help
