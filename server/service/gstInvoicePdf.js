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

        doc.image('./image/purpllelogo.jpg', 50, 45, { width: 100 })
            .fontSize(10)
            .text('101-B, 1st Floor, Raheja Plaza -I, LBS Marg', 200, 50, { align: 'right' })
            .text('Mumbai, Maharashtra, India, 400086', 200, 70, { align: 'right' })
            .moveDown();

        doc.moveTo(50, 120)
            .lineTo(550, 120)
            .lineWidth(1)      
            .strokeColor('#343434') 
            .stroke();

        doc.end()
    })
}

module.exports = { gstInvoicePdf }