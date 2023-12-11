import React, { useState } from "react";
import {
  Heading,
  Box,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Basic = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [copy, setCopy] = useState("");
  const navigate=useNavigate()

  const generateCertificate = async () => {
    try {
      const response = await fetch(
        "http://localhost:2100/api/generateCertificate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, course, linkedin }),
        }
      );

      const pdfBuffer = await response.arrayBuffer();
      const blob = new Blob([pdfBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
        setTimeout(()=>{
            
            navigate("/cert")
        },2000)
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <Box maxW="32rem">
      <Heading mb={4}>
        Below button is enabled when student complete the assessment
      </Heading>
      <Text fontSize="xl">
        As you click a modal is open where you have to fill the details to
        generate your Certificate
      </Text>
      <Button size="lg" colorScheme="green" mt="24px" onClick={onOpen}>
        Generate Certificate
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fill the details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Course</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Your Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Linkedin Username</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Your Course"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={generateCertificate}
              isDisabled={name === "" || course === "" || linkedin === ""}
            >
              Generate
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Basic;
