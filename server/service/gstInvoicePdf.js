const PDFDocument = require('pdfkit');

function gstInvoicePdf(dataCallBack, endCallBack) {
    const doc = new PDFDocument()
    doc.on('data', dataCallBack)
    doc.on('data', endCallBack)
    doc
        .fontSize(25)
        .text('Some text with an embedded font!', 100, 100);

    doc.end()
}

module.exports = { gstInvoicePdf }