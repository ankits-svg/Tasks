const express = require("express");
const { connection } = require("./config/db");
const path=require("path")
const app = express();
const cors=require("cors")
const fs = require("fs");
const htmlToPdf = require("html-pdf-node");
const { HtmlModel } = require("./models/html.models");
require("dotenv").config();
port = process.env.port || 2200;
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cors())
app.use(express.json());

// Read Canva template file
const canvaTemplatePath = path.join(__dirname, "templates", "certificate_template.html");
const canvaTemplate = fs.readFileSync(canvaTemplatePath, "utf8");

app.get("/:id", async (req, res) => {
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
  const image = "/assets/image.png"; // Replace with the actual path or URL of your image

  // Use the Canva template
  const htmlContent = canvaTemplate
    .replace("${name}", name)
    .replace("${course}", course)
    .replace("${type}", type)
    .replace("${linkedin}", linkedin)
 // Replace the placeholder with the actual image path or URL

  // Options for PDF generation
  const options = {
    format: "A4",
    landscape: true,
  };

  try {
    const pdfBuffer = await htmlToPdf.generatePdf(
      { content: htmlContent },
      options
    );

    // Save certificate details to MongoDB (Make sure you have defined Certificate model)
    const certificate = new HtmlModel({ name, course, type, linkedin });
    await certificate.save();
    console.log("certserver:", certificate);

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
      `Server i.e app.js is connected to database with port ${port}`
    );
  } catch (error) {
    console.log(`Server is not connected to database with port ${port}`);
  }
  console.log(`Server is running at ${port}`);
});

