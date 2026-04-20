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
            .text('Mumbai, Maharashtra, India, 400086', 200, 65, { align: 'right' })
            .text('Support: purplle@supportcare.com', 200, 80, { align: 'right' })
            .moveDown();

        doc.moveTo(50, 105)
            .lineTo(550, 105)
            .lineWidth(1)      
            .strokeColor('#9d9696') 
            .stroke();

        doc.font('Helvetica-Bold')
            .fontSize(14)
            .text('GST INVOICE RECEIPT', 50, 120, {align:'left'})

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Invoice No.: ', 50,150, {align:'left'})

        doc.font('Helvetica')
            .fontSize(10)
            .text('INV233511 ', 120,150, {align:'left'})

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Order ID: ', 50,170, {align:'left'})

        doc.font('Helvetica')
            .fontSize(10)
            .text('ORD45533 ', 120,170, {align:'left'})

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Order Date: ', 50,190, {align:'left'})

        doc.font('Helvetica')
            .fontSize(10)
            .text('INV233511 ', 120,190, {align:'left'})

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('GSTIN.: ', 200,150, {align:'right'})

        doc.font('Helvetica')
            .fontSize(10)
            .text('GSTK4698498MKJF77', 200,150, {align:'right'})

        doc.end()
    })
}

module.exports = { gstInvoicePdf }