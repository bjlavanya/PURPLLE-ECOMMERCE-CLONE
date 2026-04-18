const PDFDocument = require('pdfkit');

// function gstInvoicePdf() {

const gstInvoicePdf = () => {
    return new Promise((resolve) => {
        const doc = new PDFDocument()
        const buffers = []
        doc.on('data', buffers.push.bind(buffers))
        doc.on('end', () => {
            resolve(Buffer.concat(buffers))
        })

        doc
            .fontSize(20)
            .text('Thank you for your orders!!!', 100, 100)

        doc.end()
    })
}

module.exports = { gstInvoicePdf }