import React, { useState } from "react";
import "./App.css";
// import Pdf from "./Components/Pdf";
import Mainroutes from "./Components/Mainroutes";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [founder, setFounder] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [copy, setCopy] = useState("");

  const generateCertificate = async () => {
    try {
      const response = await fetch(
        "http://localhost:2100/api/generateCertificate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, course, founder }),
        }
      );

      const pdfBuffer = await response.arrayBuffer();
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  };

  const handleCopy = () => {
    const urlInput = document.getElementById("pdfUrlInput");
    if (urlInput) {
      urlInput.select();
      document.execCommand("copy");
      setCopy("Copied!");
    }
  };

  return (
    <div>
      <Mainroutes/>
    </div>
  )
  // return (

  //   <div className="App">
  //     <h1>Certificate Generator</h1>
  //     <div>
  //       <label>Name:</label>
  //       <input
  //         type="text"
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <label>Course:</label>
  //       <input
  //         type="text"
  //         value={course}
  //         onChange={(e) => setCourse(e.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <label>Linkedin Username:</label>
  //       <input
  //         type="text"
  //         value={founder}
  //         onChange={(e) => setFounder(e.target.value)}
  //       />
  //     </div>
  //     <button onClick={generateCertificate}>Generate Certificate</button>

  //     {pdfUrl && (
  //       <div>
  //         <h2>Generated Certificate Url:</h2>
  //         <div>
  //           <input
  //             id="pdfUrlInput"
  //             type="url"
  //             value={pdfUrl}
  //             readOnly
  //             onClick={(e) => e.target.select()}
  //           />
  //           <button onClick={handleCopy}>Copy Url</button>
  //           <p>{copy}</p>

  //           {/* Share buttons */}
  //           <div>
  //             <h3>Share Certificate:</h3>
  //             <button
  //               onClick={() =>
  //                 window.open(
  //                   `https://twitter.com/intent/tweet?url=${pdfUrl}&text=Check out my certificate`
  //                 )
  //               }
  //             >
  //               Share on Twitter
  //             </button>
  //             <button
  //               onClick={() =>
  //                 window.open(
  //                   `https://www.linkedin.com/in/${founder}/edit/forms/certification/new/?profileFormEntryPoint=PROFILE_COMPLETION_HUB`
  //                 )
  //               }
  //             >
  //               Share on LinkedIn
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //     {pdfUrl && (
  //       <div>
  //         <iframe
  //           title="Generated Certificate"
  //           src={pdfUrl}
  //           frameBorder="-1"
  //           style={{ border: "none", width: "80%", height: "135vh", overflow: 'hidden' }}
  //         ></iframe>
  //       </div>
  //     )}
  //   </div>
  
  // );
}

export default App;
