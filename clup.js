const cloudinary = require("cloudinary")
const fs = require("fs")

let allResources = []

const isProduction = process.env.production && process.env.production == "true" ? true : false;

const cloudinaryResourceOptions = {
    context: true,
}

// builds a json db from all images on cloudinary
async function buildDb(options) {
    if (options.verbose)
        console.log('buildDb...')

    // copy cloudinary commandline options
    cloudinaryResourceOptions.prefix = options.prefix
    cloudinaryResourceOptions.type = options.type

    // adds resources to allResources
    getResources(null, options)
}

// gets a batch of resources from Cloudinary. 
// The size of the batch is determined by options.max_results
// which defualts to 10
function getResources(cursor, options) {
    if (typeof (cursor) == 'undefined')
        return
    cloudinaryResourceOptions.next_cursor = cursor
    cloudinary.v2.api.resources(cloudinaryResourceOptions, (error, result) => {
        if (error) {
            console.log(`ERROR ${error.http_code}: ${error.message}`)
            return null
        }

        result.resources.forEach(resource => {
            if (options.verbose)
                printResource(resource)
            allResources.push(resource)
        })

        // Cloudinary includes a cursor for the next batch
        // if there is one, otherwise it doesn't
        var end = typeof (result.next_cursor) == 'undefined'

        // if it's the last batch then write the whole collection
        // out to the json 'database'
        if (end) {
            console.log(`${allResources.length} total resources written to ${options.output}.`)
            if (!options.dryRun) {
                fs.writeFile(options.output, JSON.stringify(allResources), (err) => {
                    if (err)
                        console.log(`Error writing ${options.output}: ${err.message}`);
                })
            }
        }
        else {  // get the next batch
            console.log(`${allResources.length} resources added so far...`)
            getResources(result.next_cursor, options)
        }
    })
}

function printResource(resource) {
    if (resource.context && resource.context.custom) {
        const o = resource.context.custom
        console.log(`Title: ${o.caption} 
Caption: ${o.alt}`)
    }

    console.log(`Width: ${resource.width}
Height: ${resource.height}
Url: ${resource.url}
    ------------------`)
}

exports.buildDb = buildDb
