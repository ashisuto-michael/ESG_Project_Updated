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
export default function Unit() {
  // state hooks to keep track of changes to each doc field
  const [name, setName] = useState("");
  const [materialTopic, setMaterialTopic] = useState("");

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
    db.collection("goal")
      .doc(id)
      .get()
      .then((snapshot) => {
        const doc = snapshot.data();
        console.log(doc);
        setName(doc.name);
        setMaterialTopic(doc.materialTopic);
      });
  };

  // save doc to Firestore
  const saveData = () => {
    if (!!id) {
      // edit existing doc
      db.collection("goal")
        .doc(id)
        .set({
          name,
          materialTopic,
        })
        .then(history.push("/admin/goals"));
    } else {
      // create new doc
      db.collection("goal")
        .doc()
        .set({
          name,
          materialTopic,
        })
        .then(history.push("/admin/goals"));
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
        <FormLabel>Material Topic</FormLabel>
        <Select
          placeholder="Select from existing list"
          value={materialTopic}
          onChange={(e) => setMaterialTopic(e.target.value)}
        >
          <option value="test">Unavailable for now</option>
        </Select>
      </FormControl>

      <Button onClick={saveData}>Save</Button>
    </Box>
  );
}
