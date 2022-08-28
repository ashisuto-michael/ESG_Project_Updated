// Chakra imports
import {
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../../lib/firebase";

// this page is used for creating a new doc or editing an existing doc
// the add/edit mode depends on if a doc Id is passed in page params
export default function Entity() {
  // state hooks to keep track of changes to each doc field
  const [name, setName] = useState("");
  const [classification, setClassification] = useState("");
  const [owner, setOwner] = useState("");

  // for page navigation
  const history = useHistory();

  // check page params
  const { id } = useParams();
  console.log(id);

  // load data when this page is loaded (for edit mode only)
  useEffect(() => {
    if (!!id) {
      getData(id);
    }
  }, []);

  // read doc from Firestore
  const getData = (id) => {
    db.collection("entity")
      .doc(id)
      .get()
      .then((snapshot) => {
        const doc = snapshot.data();
        console.log(doc);
        setName(doc.name);
        setClassification(doc.classification);
        setOwner(doc.owner);
      });
  };

  // save doc to Firestore
  const saveData = () => {
    if (!!id) {
      // edit existing doc
      db.collection("entity")
        .doc(id)
        .set({
          name,
          classification,
          owner,
        })
        .then(history.push("/admin/entities"));
    } else {
      // create new doc
      db.collection("entity")
        .doc()
        .set({
          name,
          classification,
          owner,
        })
        .then(history.push("/admin/entities"));
    }
  };

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Classification</FormLabel>
        <Select
          placeholder="Select"
          value={classification}
          onChange={(e) => setClassification(e.target.value)}
        >
          <option value="Company">Company</option>
          <option value="Location">Location</option>
          <option value="Vendor">Vendor</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Owner</FormLabel>
        <Input
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </FormControl>

      <Button onClick={saveData}>Save</Button>
    </Box>
  );
}
