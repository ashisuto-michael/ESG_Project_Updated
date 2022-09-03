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
  const [materialLabel, setMaterialLabel] = useState("");

  // state hooks for fields which look up other collections
  const [materialTopics, setMaterialTopics] = useState([]);

  // for page navigation
  const history = useHistory();

  // check page params
  const { id } = useParams();
  console.log(id);

  // load data when this page is loaded (for edit mode only)
  useEffect(() => {
    getDependantData();
    if (!!id) {
      getData(id);
    }
  }, []);

  // read other collections from Firestore
  const getDependantData = () => {
    db.collection("material-topic").onSnapshot((snapshot) => {
      setMaterialTopics(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id, // preprend doc Id
            ...doc.data(),
          };
        })
      );
    });
  };

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
        setMaterialLabel(doc.materialLabel);
      })
      .catch((ex) => {
        console.log("Exception: " + ex);
      });
  };

  const saveMaterial = (materialTopic) => {
    setMaterialTopic(materialTopic);
    setMaterialLabel(materialTopics.find((m) => m.id === materialTopic).name);
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
          materialLabel,
        })
        .then(history.push("/admin/goals"));
    } else {
      // create new doc
      db.collection("goal")
        .doc()
        .set({
          name,
          materialTopic,
          materialLabel,
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
          onChange={(e) => saveMaterial(e.target.value)}
        >
          {materialTopics.map((materialTopic) => (
            <option key={materialTopic.id} value={materialTopic.id}>
              {materialTopic.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button onClick={saveData}>Save</Button>
    </Box>
  );
}
