const express=require("express")
const { CertModel } = require("../models/cert.models")
const certRouter=express.Router()
const PDFDocument = require('pdfkit');
const fs = require('fs');

certRouter.post("/add",async(req,res)=>{

    try {
        const cert=new CertModel(req.body)
        await cert.save()
        res.send({"msg":"Data added sucessfully","data":req.body})
    } catch (error) {
        res.send({"msg":"Some error occured in adding the data"})
    }
    
})

function formatCurrentDate() {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const currentDate = new Date();
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  }

certRouter.post("/pdf",(req,res)=>{
    const { studentId, certtype, body, name, cofounder, founder } = req.body;
    // Create a PDF document
    const doc = new PDFDocument({ layout: 'landscape' });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${studentId}_certificate.pdf`);

    // Pipe the PDF content to the response
    doc.pipe(res);

    // Add content to the PDF with improved styling
  doc.fontSize(16).text(`Certificate of ${certtype}`, { align: 'center', underline: true });
  doc.moveDown(0.5); // Adjust spacing

  // Styling for the name
  doc.font('Helvetica-Bold').fontSize(18).text(`${name} (${studentId})`, { align: 'center' });
  doc.moveDown(0.5); // Adjust spacing

  // Styling for the body
  doc.font('Times-Roman').fontSize(14).text(`has successfully completed ${body}`, { align: 'center' });
  doc.moveDown(); // Add a line break

  // Styling for the award date
  doc.font('Helvetica-Oblique').fontSize(12).text(`Awarded on ${formatCurrentDate()}`, { align: 'center' });
  doc.moveDown(0.5); // Adjust spacing

  // Styling for cofounder and founder
  doc.font('Helvetica-Bold').fontSize(14).text(`Awarded by: ${cofounder}, Co-Founder`, { align: 'center' });
  doc.text(`and ${founder}, Founder.`, { align: 'center' });

  // Finalize the PDF
  doc.end();
})

module.exports={
    certRouter
}