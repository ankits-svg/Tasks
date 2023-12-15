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
      height: 180mm; 
      max-width: 100%;
      max-height: 100%;
     
    }

  .left-div {
    width: 23.5%;
    padding: 20px;
    position: relative;
    overflow: hidden;
    background-image: url("https://i.ibb.co/dWHTWQP/bytexl-certificate-base-background.png");
    background-size: cover;
}

.left-div::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    background: 
        repeating-linear-gradient(
            40deg, 
            transparent, 
            transparent 5px, 
            #f26e1c 5px, 
            #f26e1c 10px
        ),
        radial-gradient(circle at 10% 20%, #1da1f2 20%, transparent 25%),
        radial-gradient(circle at 20% 60%, #1da1f2 20%, transparent 25%),
        repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            #f26e1c 10px,
            #f26e1c 20px
        ),
        repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            #1da1f2 10px,
            #1da1f2 20px
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent 20px,
            #1da1f2 20px,
            #1da1f2 30px
        ),
        repeating-linear-gradient(
            -90deg,
            transparent,
            transparent 20px,
            #f26e1c 20px,
            #f26e1c 30px
        ),
        radial-gradient(circle at 80% 80%, #f26e1c 30%, transparent 40%),
        radial-gradient(circle at 60% 40%, #1da1f2 30%, transparent 40%),
        repeating-linear-gradient(
            -30deg,
            transparent,
            transparent 20px,
            #1da1f2 20px,
            #1da1f2 30px
        );
    clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);
    z-index: -1;
} 

    .right-div {
      flex: 1;
      background-color: #ffffff;
      padding: 20px;
      box-sizing: border-box; 
      text-align: center; 
      position: relative; 
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
      color: #1da1f2;
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
      color: #f26e1c;
    }

    .certify-text {
      margin-top: 7%;
      font-size: 28px;
    }

    .name {
      font-size: 56px;
      color: #f26e1c;
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
      color: #f26e1c;
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
      color: #1da1f2;
      font-size: 40px;
    }

    .xl {
      color: #f26e1c;
      font-size: 30px;
      margin-top: -10px;
    }

    h4 {
      color: #f26e1c;
    }
  </style>
  <body>
    <div class="container">
      <div class="left-div">
      </div>

      <div class="right-div">
        <!-- Content for the right div (70%) -->
        <h1 class="top-right">
          <span class="byte">byte</span><sup class="xl">XL</sup>
        </h1>
        <div class="title">Certificate</div>
        <!-- <IMg></IMg> -->
        <div class="title1">OF {type}</div>
        <div class="certify-text">
          &#8277; &#8277; &#8277; This is to certify that &#8277; &#8277;
          &#8277;
        </div>
        <div class="name">Ankit Sharma</div>
        <div class="underline"></div>
        <div class="assessment-text">
          has successfully cleared the assessment for the skill
        </div>
        <div class="programming-language">{course}</div>
        <div class="footer">
          <div>
            <div class="underline1">24 Oct 2023</div>
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
    console.log("certserver:", certificate);
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



