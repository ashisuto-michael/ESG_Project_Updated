/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

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
import { useParams, useHistory } from 'react-router-dom';
import { db } from "../../../lib/firebase";

// this page is used for creating a new doc or editing an existing doc
// the add/edit mode depends on if a doc Id is passed in page params
export default function MaterialTopic() {
  // state hooks to keep track of changes to each doc field
  const [name, setName] = useState('');
  const [classification, setClassification] = useState('');
  const [businessImportance, setBusinessImportance] = useState(0);
  const [stakeholderImportance, setStakeholderImportance] = useState(0);

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
  const getData = id => {
    db.collection('material-topic').doc(id).get().then(snapshot => {
      const doc = snapshot.data();
      console.log(doc);
      setName(doc.name);
      setClassification(doc.classification);
      setBusinessImportance(doc.businessImportance);
      setStakeholderImportance(doc.stakeholderImportance);
    });
  }

  // save doc to Firestore
  const saveData = () => {
    if (!!id) {
      // edit existing doc
      db.collection('material-topic').doc(id).set({
        name,
        classification,
        businessImportance,
        stakeholderImportance
      }).then(history.push('/admin/material-topics'));
    } else {
      // create new doc
      db.collection('material-topic').doc().set({
        name,
        classification,
        businessImportance,
        stakeholderImportance
      }).then(history.push('/admin/material-topics'));
    }
  }


  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Classification</FormLabel>
        <Select placeholder='Select' value={classification} onChange={(e) => setClassification(e.target.value)}>
          <option value='Environmental'>Environmental</option>
          <option value='Social'>Social</option>
          <option value='Governance'>Governance</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Business Importance</FormLabel>
        <NumberInput defaultValue={3} min={1} max={5} value={businessImportance} onChange={(value) => setBusinessImportance(value)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Stakeholder Importance</FormLabel>
        <NumberInput defaultValue={3} min={1} max={5} value={stakeholderImportance} onChange={(value) => setStakeholderImportance(value)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <Button onClick={saveData}>Save</Button>
    </Box>
  );
}