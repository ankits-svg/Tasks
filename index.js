const express = require("express");
const { connection } = require("./config/db");
const path=require("path")
const app = express();
const cors=require("cors")
const htmlToPdf = require("html-pdf-node");
const { HtmlModel } = require("./models/html.models");
require("dotenv").config();
port = process.env.port || 2200;
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors())
app.use(express.json());



app.get("/:id", async(req, res) => {
  console.log("req",req.params)
  const {id}=req.params;
  try {
    const certificate=await HtmlModel.find({_id:id})
    console.log("certificate:",certificate)
    res.send({ msg: "getting the result","data":certificate });
  } catch (error) {
    res.send({"msg":"Some error in getting"})
  }
});

// API endpoint to generate and save a certificate
app.post("/api/generateCertificate", async (req, res) => {
  const { name, course,type, linkedin } = req.body;
  const image = "/assets/logo.png";
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
              border: 20px solid transparent;
              /* border-image: url('your-border-image-url.png') 20 round; Add your border image URL and adjust the values as needed */
              border-image:linear-gradient(#1da1f2,#f26e1c) 50;
              border-radius: 20px;
              writing-mode: horizontal-tb; 
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
            font-size: 34px;
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
          .byte {
            color: #1DA1F2;
            font-size: 40px;
        }

        .xl {
            color: #F26E1C;
            font-size: 30px;
            margin-top: -10px;
        }
        .date{
          color: #1DA1F2;
        }
        h4{
          color: #F26E1C;
        }
        h1 {
          position: absolute;
          top: 10px; /* Adjust the top position as needed */
          font-size: 20px;
      }

      h1.top-right {
          right: 10px; /* Adjust the right position as needed */
      }
      </style>
  </head>
  
  <body>
      <div class="certificate">
          <div class="content">
              <h1 class="top-right"><span class="byte">byte</span><sup class="xl">XL</sup></h1>
              <div class="title">CERTIFICATE</div>
              <div class="title">OF ${type}</div>
              <div class="certify-text">&#8277; &#8277; &#8277; This is to certify that &#8277; &#8277; &#8277;</div>
              <div class="name">${name}</div>
              <div class="underline"></div>
              <div class="assessment-text">
              has demonstrated exceptional proficiency and mastery in the field of
              </div>
              <div class="programming-language">${course}</div>
              <div class="footer">
                  <div>
                      <div class="underline1"><strong class="date">${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></div>
                      <h4>Date of Achievement</h4>
                  </div>
                  <div>
                      <div class="underline1"><strong class="date">Karun Tadepalli</strong></div>
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
    
    const pdfBuffer = await htmlToPdf.generatePdf(
      { content: htmlContent },
      options
    );

    // Save certificate details to MongoDB (Make sure you have defined Certificate model)
    const certificate = new HtmlModel({ name, course,type,linkedin });
    await certificate.save();
      console.log("certserver:",certificate)
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

