const express = require("express");
const { connection } = require("./config/db");
const app = express();
const cors=require("cors")
// const image=require("./assets/")
const htmlToPdf = require("html-pdf-node");
const { HtmlModel } = require("./models/html.models");
require("dotenv").config();
port = process.env.port || 2200;

app.use(cors())
app.use(express.json());


app.get("/", async(req, res) => {
  console.log("req",req.params)
  try {
    const certificate=await HtmlModel.find()
    res.send({ msg: "getting the result","data":certificate });
  } catch (error) {
    res.send({"msg":"Some error in getting"})
  }
});

// API endpoint to generate and save a certificate
app.post("/api/generateCertificate", async (req, res) => {
  const { name, course, linkedin } = req.body;
    const image="assets/logo.png"
  // HTML content for the certificate
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Carattere&family=Cedarville+Cursive&family=Dancing+Script&display=swap" rel="stylesheet" />
      <title>Certificate</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
          }
  
          .certificate {
              width: 850px;
              height: 650px;
              margin: 30px auto;
              position: relative;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-block-style: dotted; /* Specify the border style for the vertical direction */
              border-inline-style: dotted; /* Specify the border style for the horizontal direction */
              writing-mode: horizontal-tb;  /* Specify the writing mode */
          }
  
          .content {
              padding: 30px;
              text-align: center;
              z-index: 1;
          }
  
          .logo {
              display: block;
              margin: auto;
              margin-top: 20px;
          }
  
          .title {
              text-align: center;
              font-weight: bold;
              margin-top: 20px;
              font-size: 54px;
              color: #f26e1c;
          }
  
          .certify-text {
              margin-top: 20px;
              text-align: center;
              font-size: 18px;
          }
  
          .name {
              text-align: center;
              font-size: 56px;
              color: #1da1f2;
              margin-top: 30px;
          }
  
          .underline {
              width: 75%;
              border-bottom: 2px solid #000;
              margin: 10px auto;
          }
  
          .underline1 {
              width: 100%;
              border-bottom: 2px solid #000;
              margin: 10px auto;
          }
  
          .assessment-text {
              text-align: center;
              font-size: 20px;
              margin-top: 10px;
              color: black;
          }
  
          .programming-language {
              text-align: center;
              font-weight: bold;
              margin-top: 10px;
              font-size: 24px;
              color: #f26e1c;
          }
  
          .footer {
              display: flex;
              justify-content: space-around;
              margin-top: 70px;
              font-size: 14px;
          }
      </style>
  </head>
  
  <body>
      <div class="certificate">
          <div class="content">
              <img src="/assetes/logo.png" alt="Company Logo" class="logo" />
              <div class="title">CERTIFICATE</div>
              <div class="certify-text">&#8277; &#8277; &#8277; This is to certify &#8277; &#8277; &#8277;</div>
              <div class="name">${name}</div>
              <div class="underline"></div>
              <div class="assessment-text">
                  has successfully cleared the assessment for the skill
              </div>
              <div class="programming-language">${course}</div>
              <div class="footer">
                  <div>
                      <div class="underline1">${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                      <h4>Date</h4>
                  </div>
                  <div>
                      <div class="underline1">Karun Tadepalli</div>
                      <h4>CEO & Co-founder</h4>
                  </div>
              </div>
          </div>
      </div>
  </body>
  
  </html>
  
        `;

  // Options for PDF generation
  const options = {
    format: "A4",
    landscape: true, // Set to true for landscape format
  };

  try {
    //   // Generate PDF from HTML content
    //   const pdfBuffer = await htmlToPdf.generatePdf({ content: htmlContent }, options);

    //   // Save certificate details to MongoDB
    //   const certificate = new Certificate({ name, course, founder });
    //   await certificate.save();

    //   // Respond with the PDF buffer
    //   res.send(pdfBuffer);

    // Generate PDF from HTML content
    const pdfBuffer = await htmlToPdf.generatePdf(
      { content: htmlContent },
      options
    );

    // Save certificate details to MongoDB (Make sure you have defined Certificate model)
    const certificate = new HtmlModel({ name, course, linkedin });
    await certificate.save();

    // Respond with the PDF buffer
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});




app.listen(port, async () => {
  try {
    await connection;
    console.log(
      `Server i.e index.js is connected to database with port ${port}`
    );
  } catch (error) {
    console.log(`Server is not connected to database with port ${port}`);
  }
  console.log(`Server is running at ${port}`);
});
