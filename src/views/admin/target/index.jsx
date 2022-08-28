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
export default function Target() {
  // state hooks to keep track of changes to each doc field
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [metric, setMetric] = useState("");
  const [targetValue, setTarget] = useState("");

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
    db.collection("target")
      .doc(id)
      .get()
      .then((snapshot) => {
        const doc = snapshot.data();
        console.log(doc);
        setName(doc.name);
        setStartDate(doc.startDate);
        setEndDate(doc.endDate);
        setMetric(doc.metric);
        setTarget(doc.targetValue);
      });
  };

  // save doc to Firestore
  const saveData = () => {
    if (!!id) {
      // edit existing doc
      db.collection("target")
        .doc(id)
        .set({
          name,
          startDate,
          endDate,
          metric,
          targetValue,
        })
        .then(history.push("/admin/targets"));
    } else {
      // create new doc
      db.collection("target")
        .doc()
        .set({
          name,
          startDate,
          endDate,
          metric,
          targetValue,
        })
        .then(history.push("/admin/targets"));
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
        <FormLabel>Start Date</FormLabel>
        <Input
          placeholder="Schedule"
          size="md"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>End Date</FormLabel>
        <Input
          placeholder="Schedule"
          size="md"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Metric</FormLabel>
        <Select
          placeholder="Select from existing list"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
        >
          <option value="test">Unavailable for now</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Target Value</FormLabel>
        <Input
          placeholder="Target Value"
          value={targetValue}
          onChange={(e) => setTarget(e.target.value)}
        />
      </FormControl>

      <Button onClick={saveData}>Save</Button>
    </Box>
  );
}
