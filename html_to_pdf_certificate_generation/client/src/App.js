import React, { useState } from "react";
import { ChakraProvider, Box, IconButton, Heading, Input, Button, Text, InputGroup, InputRightElement } from "@chakra-ui/react";
import "./App.css";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [founder, setFounder] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [copy, setCopy] = useState("");

  const generateCertificate = async () => {

    let obj={
      name:name,
      course:course,
      founder:founder
    }
    if(obj.name!=="" || obj.course!=="" || obj.founder!==""){
      try {
        const response = await fetch("http://localhost:2100/api/generateCertificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, course, founder }),
        });
  
        const pdfBuffer = await response.arrayBuffer();
        const blob = new Blob([pdfBuffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setName("")
        setCourse("")
        // setFounder("")
      } catch (error) {
        console.error("Error generating certificate:", error);
      }
    }else{
      alert('Please fill the details')
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
  const isDisabled = !name || !course || !founder;

  return (
    <ChakraProvider>
      <Box className="App" textAlign="center" p={8}>
        <Heading as="h1" size="xl" mb={4}>
          Certificate Generator
        </Heading>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mb={4}>
          <InputGroup>
            <Input
              placeholder="Linkedin Username"
              value={founder}
              onChange={(e) => setFounder(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Button colorScheme="teal" size="md" mb={4} onClick={generateCertificate} isDisabled={isDisabled}>
          Generate Certificate
        </Button>

        {pdfUrl && (
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Generated Certificate Url:
            </Heading>
            <Box>
              <InputGroup>
                <Input
                  id="pdfUrlInput"
                  type="url"
                  value={pdfUrl}
                  readOnly
                  onClick={(e) => e.target.select()}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleCopy}>
                    Copy
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text color="green.500" mt={2}>
                {copy}
              </Text>
            </Box>
            <Box mt={4}>
  {/* Share buttons */}
  <Heading as="h3" size="md">
    Share Certificate:
  </Heading>
  <IconButton
    colorScheme="twitter"
    size="md"
    aria-label="Share on Twitter"
    icon={<FaTwitter />}
    onClick={() =>
      window.open(`https://twitter.com/intent/tweet?url=${pdfUrl}&text=Check out my certificate`)
    }
    borderRadius="full" // Makes the button circular
    mr={2} // Add some margin to separate buttons
  />
  <IconButton
    colorScheme="linkedin"
    size="md"
    aria-label="Share on LinkedIn"
    icon={<FaLinkedin />}
    onClick={() =>
      window.open(`https://www.linkedin.com/in/${founder}/edit/forms/certification/new/?profileFormEntryPoint=PROFILE_COMPLETION_HUB`)
    }
    borderRadius="full" // Makes the button circular
  />
</Box>
          </Box>
        )}
        {pdfUrl && (
          <Box>
            <iframe
              title="Generated Certificate"
              src={pdfUrl}
              frameBorder="0"
              style={{ border: "none", width: "80%", height: "125vh", overflow: 'hidden',margin:"auto", marginTop:"20px" }}
            ></iframe>
            {/* <Embed src={pdfUrl} width="80%" height="600px" /> */}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
