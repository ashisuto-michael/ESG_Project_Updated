// Chakra imports
import {
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
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
  const [format, setFormat] = useState("");

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
    db.collection("unit")
      .doc(id)
      .get()
      .then((snapshot) => {
        const doc = snapshot.data();
        console.log(doc);
        setName(doc.name);
        setFormat(doc.format);
      });
  };

  // save doc to Firestore
  const saveData = () => {
    if (!!id) {
      // edit existing doc
      db.collection("unit")
        .doc(id)
        .set({
          name,
          format,
        })
        .then(history.push("/admin/units"));
    } else {
      // create new doc
      db.collection("unit")
        .doc()
        .set({
          name,
          format,
        })
        .then(history.push("/admin/units"));
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
        <FormLabel>Format</FormLabel>
        <Input
          placeholder="e.g. DAYS/ $/ %"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />
      </FormControl>

      <Button onClick={saveData}>Save</Button>
    </Box>
  );
}
