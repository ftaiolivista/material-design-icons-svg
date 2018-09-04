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
            let i = -1
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
                                i++
                                resolve(
                                    {
                                        symbol: data
                                            .replace(
                                                /<svg /,
                                                '<symbol id="' + m[1] + '" '
                                            )
                                            .replace('</svg>', '</symbol>')
                                            .replace(
                                                'xmlns="http://www.w3.org/2000/svg"',
                                                ''
                                            )
                                            .replace(
                                                'width="48"',
                                                ''
                                            )
                                            .replace(
                                                'height="48"',
                                                ''
                                            )
                                            .concat('\n'),
                                        view: '<view id="' + m[1] + '-view" viewBox="0 '+i*48+' 48 48" />\n',
                                        use: '<use xlink:href="#' + m[1] + '" width="48" height="48" x="0" y="'+i*48+'"></use>\n'
                                    }
                                )
                            })
                        })
                    }
                })
            )
                .then(symbols => {
                    return (
                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                        '<defs></defs>\n' +
                        symbols.map(r => r.symbol).join('') +
                        symbols.map(r => r.view).join('') +
                        symbols.map(r => r.use).join('') +
                        '</svg>'
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
        let i = -1
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
                            i++
                            resolve(
                                {
                                    symbol: data
                                        .replace(
                                            /<svg /,
                                            '<symbol id="' + m[1] + '" '
                                        )
                                        .replace('</svg>', '</symbol>')
                                        .replace(
                                            'xmlns="http://www.w3.org/2000/svg"',
                                            ''
                                        )
                                        .replace(
                                            'width="48"',
                                            ''
                                        )
                                        .replace(
                                            'height="48"',
                                            ''
                                        )
                                        .concat('\n'),
                                    view: '<view id="' + m[1] + '-view" viewBox="0 '+i*48+' 48 48" />\n',
                                    use: '<use xlink:href="#' + m[1] + '" width="48" height="48" x="0" y="'+i*48+'"></use>\n'
                                }
                            )
                        })
                    })
                }
            })
        )
            .then(symbols => {
                return (
                    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs>' +
                    symbols.map(r => r.symbol).join('') +
                    symbols.map(r => r.view).join('') +
                    symbols.map(r => r.use).join('') +
                    '</svg>'
                )
            })
            .then(out => {
                fs.writeFile('./dist/mdi.svg', out, function (
                    err
                ) {
                    if (err) {
                        return console.log(err)
                    }

                    console.log('./dist/mdi.svg')
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

        Promise.all(
            files.map(filename => {
                const m = filename.match(re)
                if (!m) {
                    console.log('cannot match ' + filename)
                    return Promise.resolve('')
                } else {
                    return (
                        ' &.' + m[1] + '{ background-image: url(\'#{$svgPath}#' + m[1] + '-view\'); }\n'
                    )
                }
            })
        )
            .then(symbols => {
                return (
                    '$svgPath: \'mdi.svg\' !default;\n' +
                    '$svgSize: 48px !default;\n' +
                    '$svgPrimary: 0.87 !default;\n' +
                    '$svgSecondary: 0.54 !default;\n' +
                    '$svgDisabled: 0.37 !default;\n' +
                    '$svgDivider: 0.08 !default;\n' +
                    '.mdsvg { opacity: $svgPrimary; font: 0/0 a; display: inline-block; vertical-align: super; background-color: transparent; fill: currentColor; width: $svgSize; height: $svgSize; line-height: $svgSize;}\n' +
                    '.mdsvg.reverse { filter: invert(1); }\n' +
                    '.mdsvg.primary { opacity: $svgPrimary; }\n' +
                    '.mdsvg.secondary { opacity: $svgSecondary; }\n' +
                    '.mdsvg.disabled { opacity: $svgDisabled; }\n' +
                    '.mdsvg.divider { opacity: $svgDivider; }\n' +
                    '.mdsvg {\n' +
                    symbols.join('') +
                    '\n}\n'
                )
            })
            .then(out => {
                fs.writeFile('./dist/misvg.scss', out, function (err) {
                    if (err) {
                        return console.log(err)
                    }

                    console.log('./dist/misvg.scss')
                })
                return out
            })


    }
)
