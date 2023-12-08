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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

/*
{
    "studentId":"fw20_0222",
    "certtype":"Completion",
    "body":"Python Programming",
    "name":"Ankesh Kumar",
    "cofounder":"charan",
    "founder":"karun"
}
*/
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

        let obj={
            name:name,
            studentId:studentId,
            cofounder:"Charan T",
            founder:"Karun Tadepalli",
            certtype:"Completion",
            body:"Full Stack Web Development"
        }
      try {
        const response = await fetch('http://localhost:3100/cert/pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
        console.log("res:",response)
        setName("")
        SetStudentId("")
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download =`${name}_${body}_Certificate.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Error generating certificate:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    };
  return (
    <div>
      <Button onClick={onOpen}>Open Modal</Button>
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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Student Type</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Your studentId"
                value={studentId}
                onChange={(e) => SetStudentId(e.target.value)}
              />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleGenerate}>
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
