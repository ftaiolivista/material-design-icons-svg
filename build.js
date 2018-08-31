const glob = require('glob')
const parseString = require('xml2js').parseString
const fs = require('fs')

const categories = new Promise(function (resolve, reject) {
    glob('./node_modules/material-design-icons/*', {}, function (er, files) {
        // [
        //     0: 'ic_star_half_48px.svg',
        //     1: 'star_half',
        //     2: '48',
        //     3: index: 59,
        //     input: './node_modules/material-design-icons/toggle/svg/production/ic_star_half_48px.svg'
        // ]
        resolve(files.filter(fn => fs.lstatSync(fn).isDirectory()))
    })
})

categories.then(categories => {
    categories.map(categoryFolder => {
        const category = categoryFolder.split('/').pop()
        console.log('Category ' + category)
        glob(categoryFolder + '/**/svg/production/*_48px.svg', {}, function (
            er,
            files
        ) {
            // [
            //     0: 'ic_star_half_48px.svg',
            //     1: 'star_half',
            //     2: '48',
            //     3: index: 59,
            //     input: './node_modules/material-design-icons/toggle/svg/production/ic_star_half_48px.svg'
            // ]
            const re = /ic_([a-zA-Z_0-9]+)_([0-9]+)px.svg/
            Promise.all(
                files.map(filename => {
                    const m = filename.match(re)
                    if (!m) {
                        console.log('cannot match ' + filename)
                        return Promise.resolve('')
                    } else {
                        return new Promise(function (resolve, reject) {
                            fs.readFile(filename, 'utf8', function (err, data) {
                                if (err) {
                                    reject(err)
                                }
                                resolve(
                                    data
                                        .replace(
                                            /<svg /,
                                            '<symbol id="' + m[1] + '" '
                                        )
                                        .replace('</svg>', '</symbol>')
                                )
                            })
                        })
                    }
                })
            )
                .then(symbols => {
                    return (
                        '<svg display="none" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>' +
                        symbols.join('') +
                        '</defs></svg>'
                    )
                })
                .then(out => {
                    fs.writeFile('./dist/' + category + '.svg', out, function (
                        err
                    ) {
                        if (err) {
                            return console.log(err)
                        }

                        console.log('./dist/' + category + '.svg')
                    })
                    return out
                })
        })
    })
})

// options is optional
glob(
    './node_modules/material-design-icons/**/svg/production/*_48px.svg',
    {},
    function (er, files) {
        // [
        //     0: 'ic_star_half_48px.svg',
        //     1: 'star_half',
        //     2: '48',
        //     3: index: 59,
        //     input: './node_modules/material-design-icons/toggle/svg/production/ic_star_half_48px.svg'
        // ]
        const re = /ic_([a-zA-Z_0-9]+)_([0-9]+)px.svg/
        Promise.all(
            files.map(filename => {
                const m = filename.match(re)
                if (!m) {
                    console.log('cannot match ' + filename)
                    return Promise.resolve('')
                } else {
                    return new Promise(function (resolve, reject) {
                        console.log ('icon '+m[1])
                        fs.readFile(filename, 'utf8', function (err, data) {
                            if (err) {
                                reject(err)
                            }
                            resolve(
                                data
                                    .replace(
                                        /<svg /,
                                        '<symbol id="' + m[1] + '" '
                                    )
                                    .replace('</svg>', '</symbol>')
                            )
                        })
                    })
                }
            })
        )
            .then(symbols => {
                return (
                    '<svg display="none" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>' +
                    symbols.join('')+
                    '</defs></svg>'
                )
            })
            .then(out => {
                fs.writeFile('./dist/material-design-icons.svg', out, function (
                    err
                ) {
                    if (err) {
                        return console.log(err)
                    }

                    console.log('./dist/material-design-icons.svg')
                })
            })

        Promise.all(
            files.map(filename => {
                const m = filename.match(re)
                if (!m) {
                    console.log('cannot match ' + filename)
                    return Promise.resolve('')
                } else {
                    return (
                        '<svg role="img" title="' +
                        m[1] +
                        '"><use xlink:href="' +
                        'material-design-icons' +
                        '.svg#' +
                        m[1] +
                        '"></use></svg>'
                    )
                }
            })
        )
            .then(symbols => {
                return (
                    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><title>MDI</title><style>svg {background-color: transparent;fill: currentColor;width: 24px;height: 24px;}</style></head><body>' +
                    symbols.join('') +
                    '</body></html>'
                )
            })
            .then(out => {
                fs.writeFile('./dist/index.html', out, function (err) {
                    if (err) {
                        return console.log(err)
                    }

                    console.log('./dist/index.html')
                })
                return out
            })
    }
)