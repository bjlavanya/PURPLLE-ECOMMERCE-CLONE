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
            .text('GSTIN.: ', 320,150, {align:'right',  width:100})

        doc.font('Helvetica')
            .fontSize(10)
            .text('GSTK4698498MKJF77', 430,150, {align:'left'})

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Payment: ', 330,170, {align:'right',  width:100})

        doc.font('Helvetica')
            .fontSize(10)
            .text('Online payment', 430,170, {align:'left'})

        doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Status: ', 320,190, {align:'right',  width:100})

        doc.font('Helvetica')
            .fontSize(10)
            .text('Success', 430,190, {align:'left'})

         doc.moveTo(50, 210)
            .lineTo(550, 210)
            .lineWidth(1)      
            .strokeColor('#9d9696') 
            .stroke();

         doc.font('Helvetica-Bold')
            .fontSize(14)
            .text('Billing Address: ', 50, 220, {align:'left'})

        doc.font('Helvetica')
            .fontSize(10)
            .text('Lava ', 50,240, {align:'left'})

        doc.font('Helvetica')
            .fontSize(10)
            .text('Mallikatte, mangalore, Karnataka -573425 ', 50,260, {align:'left'})

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

doc.text('Product', 50, 300);
doc.text('Qty', 200, 300);
doc.text('Base Price', 260, 300);
doc.text('GST (18%)', 360, 300);
doc.text('Total', 460, 300);

doc.moveTo(50, 315)
   .lineTo(550, 315)
   .stroke();

doc.font('Helvetica');

doc.text('Face Wash', 50, 325);
doc.text('2', 200, 325);
doc.text('₹169', 260, 325);
doc.text('₹31', 360, 325);
doc.text('₹200', 460, 325);

doc.moveTo(50, 340)
   .lineTo(550, 340)
   .stroke();

doc.text('Shampoo', 50, 350);
doc.text('1', 200, 350);
doc.text('₹254', 260, 350);
doc.text('₹46', 360, 350);
doc.text('₹300', 460, 350);

doc.moveTo(50, 365)
   .lineTo(550, 365)
   .stroke();

doc.text('Lipstick', 50, 375);
doc.text('1', 200, 375);
doc.text('₹424', 260, 375);
doc.text('₹76', 360, 375);
doc.text('₹500', 460, 375);

doc.moveTo(50, 390)
   .lineTo(550, 390)
   .stroke();
        
        doc.end()
    })
}

module.exports = { gstInvoicePdf }
