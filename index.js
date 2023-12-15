const express = require("express");
const { connection } = require("./config/db");
const path = require("path");
const app = express();
const cors = require("cors");
const htmlToPdf = require("html-pdf-node");
const { HtmlModel } = require("./models/html.models");
require("dotenv").config();
port = process.env.port || 2200;
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors());
app.use(express.json());

app.get("/:id", async (req, res) => {
  console.log("req", req.params);
  const { id } = req.params;
  try {
    const certificate = await HtmlModel.find({ _id: id });
    console.log("certificate:", certificate);
    res.send({ msg: "getting the result", data: certificate });
  } catch (error) {
    res.send({ msg: "Some error in getting" });
  }
});

// API endpoint to generate and save a certificate
app.post("/api/generateCertificate", async (req, res) => {
  const { name, course, type, linkedin } = req.body;
  const image = "/assets/logo.png";
  // HTML content for the certificate
  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>byteXL</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Carattere&family=Cedarville+Cursive&family=Dancing+Script:wght@400;700&family=Marck+Script&family=Tangerine:wght@700&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
        box-shadow:rgba(0, 0, 0, 0.16) 0px 1px 4px;
      display: flex;
      width: 297mm;
      max-width: 100%;
      max-height: 120%;
    }
  .left-div {
    width: 100%;
    position: relative;
    overflow: hidden;
}

    .right-div {
      flex: 1;
      position: relative;
      
      right: 10%;
      background-color: #FFFFFF;
      padding: 20px;
      box-sizing: border-box;
      text-align: center;
     
    }
    h1.top-right {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
    }
    .title {
      font-weight: bold;
      margin-top: 20px;
      font-size: 164px;
      color: #1DA1F2;
      font-family: "Beau Rivage", cursive;
      font-family: "Carattere", cursive;
      font-family: "Cedarville Cursive", cursive;
      font-family: "Dancing Script", cursive;
      font-family: "Marck Script", cursive;
      font-family: "Playball", cursive;
      font-family: "Tangerine", cursive;
    }
    .title1 {
      font-weight: bold;
      margin-top: -20px;
      margin-left: 30%;
      font-size: 24px;
      color: #F26E1C;
    }
    .certify-text {
      margin-top: 7%;
      font-size: 28px;
    }
    .name {
      font-size: 56px;
      color: #F26E1C;
      margin-top: 30px;
      font-family: "Beau Rivage", cursive;
      font-family: "Carattere", cursive;
      font-family: "Cedarville Cursive", cursive;
      font-family: "Dancing Script", cursive;
      font-family: "Marck Script", cursive;
      font-family: "Playball", cursive;
      font-family: "Tangerine", cursive;
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
      font-size: 30px;
      margin-top: 10px;
      color: black;
    }
    .programming-language {
      font-weight: bold;
      margin-top: 10px;
      font-size: 44px;
      color: #F26E1C;
      font-family: "Beau Rivage", cursive;
      font-family: "Carattere", cursive;
      font-family: "Cedarville Cursive", cursive;
      font-family: "Dancing Script", cursive;
      font-family: "Marck Script", cursive;
      font-family: "Playball", cursive;
      font-family: "Tangerine", cursive;
    }
    .footer {
      display: flex;
      justify-content: space-around;
      margin-top: 40px;
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
    h4 {
      color: #F26E1C;
    }
    .image{
        min-height: 120%;
      position: relative;
      right:  5%;
      bottom: 10%;
        width: 170%;
    }
  </style>
  <body>
    <div class="container">
      <div class="left-div">
        <img class="image" src="https://ankit-123.my.canva.site/sa/images/d848d22c8df4e2d1fb90c190dcdcd2d8.png" alt="logo">
      </div>
      <div class="right-div">
       
        <h1 class="top-right">
          <span class="byte">byte</span><sup class="xl">XL</sup>
        </h1>
        <div class="title">Certificate</div>
        
        <div class="title1">OF ${type}</div>
        <div class="certify-text">
          &#8277; &#8277; &#8277; This is to certify that &#8277; &#8277;
          &#8277;
        </div>
        <div class="name">${name}</div>
        <div class="underline"></div>
        <div class="assessment-text">
          has successfully cleared the assessment for the skill
        </div>
        <div class="programming-language">${course}</div>
        <div class="footer">
            <div>
                <div class="underline1"><strong class="date">${new Date().toLocaleDateString(
                  "en-US",
                  { day: "numeric", month: "short", year: "numeric" }
                )}</strong></div>
                <h4>Date of Achievement</h4>
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

  const options = {
    format: "A4",
    landscape: true,
  };

  try {
    const pdfBuffer = await htmlToPdf.generatePdf(
      { content: htmlContent },
      options
    );

    const certificate = new HtmlModel({ name, course, type, linkedin });
    await certificate.save();
    // console.log("certserver:", certificate);
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



