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

        // doc
        //     .fontSize(20)
        //     .text('Thank you for your orders!!!', 100, 100)

        doc.image('./image/purpllelogo.jpg', 50, 45, { width: 50 })
            .fontSize(20)
            .text('ACME Inc.', 110, 57)
            .fontSize(10)
            .text('101-B, 1st Floor, Raheja Plaza -I, LBS Marg', 200, 65, { align: 'right' })
            .text('Mumbai, Maharashtra, India, 400086', 200, 80, { align: 'right' })
            .moveDown();

      

        doc.end()
    })
}

module.exports = { gstInvoicePdf }