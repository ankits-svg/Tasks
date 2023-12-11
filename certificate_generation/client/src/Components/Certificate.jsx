import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Certificate = () => {
  const [name, setName] = useState("");
  const [studentId, SetStudentId] = useState("");
  //   const [certtype, setCerttype] = useState("Completion");
  const [body, setBody] = useState("Full Stack Web Development");
  //   const [cofounder, setCofounder] = useState("Charan T");
  //   const [founder, setFounder] = useState("Karun Tadepalli");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();
  //   const handleGenerate=async()=>{
  //     let obj={
  //         name:name,
  //         studentId:studentId,
  //         cofounder:"Charan T",
  //         founder:"Karun Tadepalli",
  //         certtype:"Completion",
  //         body:"Full Stack Web Development"
  //     }
  //     console.log(obj)

  //     fetch("http://localhost:3100/cert/pdf",{
  //         method:"POST",
  //         body:JSON.stringify(obj),
  //         "Content-Type":"application/json"
  //     }).then(res=>res.json()).then(res=>{
  //         console.log(res)

  //     }).catch(err=>{
  //         console.log(err)
  //     })
  //   }

  const handleGenerate = async () => {
    let obj = {
      name: name,
      studentId: studentId,
      cofounder: "Charan T",
      founder: "Karun Tadepalli",
      certtype: "Completion",
      body: "Full Stack Web Development",
    };
    if (obj.name !== "" && obj.studentId !== "") {
      try {
        const response = await fetch(
          "https://certificate-generation-37u0.onrender.com/cert/pdf",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        );
        console.log("res:", response);
        setName("");
        SetStudentId("");
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          // Open the PDF in a new tab
        window.open(url, '_blank');

        // Create a download link for the PDF
          const a = document.createElement("a");
          a.href = url;
          a.download = `${name}_${body}_Certificate.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          toast({
            title: "Certificate Generated",
            description: `Thankx ${name} for your successfull completion of ${body}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        // Share the PDF using the navigator.share API
        if (navigator.share) {
          const shareData = {
            title: `${name}_Certificate`,
            text: `Check out my certificate: ${name}_${body}_Certificate.pdf`,
            files: [blob],
          };

          try {
            await navigator.share(shareData);
            console.log('Shared successfully');
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          console.warn('Sharing not supported on this device/browser.');
        }
          
        } else {
          console.error("Error generating certificate:", response.statusText);
        }

        
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast({
        title: "You may miss some details",
        description: `Sorry, ${name} unable to generate your certificate for ${body}`,
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  return (
    <div>
      <Text >
        Below button enable when students completes the particular
        program/course
      </Text>
      <Button m={'60'} onClick={onOpen} bg={"orange"} color={"white"}>
        Generate Certificate
      </Button>
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

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
              <FormLabel>Student Type</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Your studentId"
                value={studentId}
                onChange={(e) => SetStudentId(e.target.value)}
                required
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleGenerate}
              isDisabled={name === "" || studentId === ""}
            >
              Generate
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Certificate;
