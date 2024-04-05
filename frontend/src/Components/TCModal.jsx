import {
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    ModalFooter,
    useDisclosure
    
} from "@chakra-ui/react";

export const TCModal = ({isOpen, onClose})=>{
    // const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>TERMS & CONDITIONS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.            </Text>
            <Text fontWeight='bold' mb='1rem'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text fontWeight='bold' mb='1rem'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost'>Accept</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}