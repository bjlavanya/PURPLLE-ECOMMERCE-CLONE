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
            .text('GST INVOICE RECEIPT', 50, 120, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Invoice No.: ', 50, 150, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text('INV233511 ', 120, 150, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Order ID: ', 50, 170, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text('ORD45533 ', 120, 170, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Order Date: ', 50, 190, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text('INV233511 ', 120, 190, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('GSTIN.: ', 320, 150, { align: 'right', width: 100 })

        doc.font('Helvetica')
            .fontSize(10)
            .text('GSTK4698498MKJF77', 430, 150, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Payment: ', 330, 170, { align: 'right', width: 100 })

        doc.font('Helvetica')
            .fontSize(10)
            .text('Online payment', 430, 170, { align: 'left' })

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Status: ', 320, 190, { align: 'right', width: 100 })

        doc.font('Helvetica')
            .fontSize(10)
            .text('Success', 430, 190, { align: 'left' })

        doc.moveTo(50, 210)
            .lineTo(550, 210)
            .lineWidth(1)
            .strokeColor('#9d9696')
            .stroke();

        doc.font('Helvetica-Bold')
            .fontSize(14)
            .text('Billing Address: ', 50, 220, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text('Lava ', 50, 240, { align: 'left' })

        doc.font('Helvetica')
            .fontSize(10)
            .text('Mallikatte, mangalore, Karnataka -573425 ', 50, 260, { align: 'left' })

        doc.moveTo(50, 280)
            .lineTo(550, 280)
            .lineWidth(1)
            .strokeColor('#9d9696')
            .stroke();

        doc.font('Helvetica-Bold')
            .fontSize(12)
            .text('Product Details (GST Inclusive Taxes)', 50, 300);

        doc.font('Helvetica-Bold')
            .fontSize(10);

        doc.text('Product', 50, 325);
        doc.text('Qty', 200, 325);
        doc.text('Base Price', 260, 325);
        doc.text('GST (18%)', 360, 325);
        doc.text('Total', 460, 325);

        doc.moveTo(50, 340)
            .lineTo(550, 340)
            .stroke();

        doc.font('Helvetica');

        doc.text('Face Wash', 50, 350);
        doc.text('2', 200, 350);
        doc.text('Rs.169', 260, 350);
        doc.text('Rs.31', 360, 350);
        doc.text('Rs.200', 460, 350);

        doc.text('Shampoo', 50, 370);
        doc.text('1', 200, 370);
        doc.text('Rs.254', 260, 370);
        doc.text('Rs46', 360, 370);
        doc.text('Rs.300', 460, 370);

        doc.text('Lipstick', 50, 390);
        doc.text('1', 200, 390);
        doc.text('Rs.424', 260, 390);
        doc.text('Rs.76', 360, 390);
        doc.text('Rs.500', 460, 390);

        doc.moveTo(50, 420)
            .lineTo(550, 420)
            .stroke();

        doc.font('Helvetica')
            .fontSize(10);

        doc.text('Subtotal', 360, 435);
        doc.text('Rs.1000', 460, 435);

        doc.text('Shipping Fee', 360, 455);
        doc.text('Rs.50', 460, 455);

        doc.text('Platform Fee', 360, 475);
        doc.text('rs.10', 460, 475);

        doc.font('Helvetica-Bold');

        doc.moveTo(50, 495)
            .lineTo(550, 495)
            .stroke();

        doc.text('Grand Total', 360, 505);
        doc.text('Rs.1060', 460, 505);

        doc.end()
    })
}

module.exports = { gstInvoicePdf }
