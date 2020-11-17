module.exports.addStyles = function addStyles(wb) {
    return [
        wb.createStyle({
            font: {
                color: '#000000',
                size: 12
            },
            border: {
                left: {
                    style: 'medium',
                    color: '#000000'
                },
                right: {
                    style: 'medium',
                    color: '#000000'
                },
                top: {
                    style: 'medium',
                    color: '#000000'
                },
                bottom: {
                    style: 'medium',
                    color: '#000000'
                }
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        }),
        wb.createStyle({
            font: {
                color: '#000000',
                size: 12
            },
            border: {
                left: {
                    style: 'medium',
                    color: '#000000'
                },
                right: {
                    style: 'medium',
                    color: '#000000'
                },
                top: {
                    style: 'medium',
                    color: '#000000'
                },
                bottom: {
                    style: 'medium',
                    color: '#000000'
                }
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
            fill: {
                type: "pattern",
                bgColor: "#808080"
            }
        }),
        wb.createStyle({
            font: {
                color: '#C0392B',
                size: 18
            }
        })
    ]
}