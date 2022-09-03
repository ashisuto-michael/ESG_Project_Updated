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
export default function Metric() {
  // state hooks to keep track of changes to each doc field
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [unitLabel, setUnitLabel] = useState("");
  const [entity, setEntity] = useState("");
  const [entityLabel, setEntityLabel] = useState("");
  const [source, setSource] = useState("");
  const [schedule, setSchedule] = useState("");

  // state hooks for fields which look up other collections
  const [units, setUnits] = useState([]);
  const [entities, setEntities] = useState([]);

  // for page navigation
  const history = useHistory();

  // check page params
  const { id } = useParams();
  console.log(id);

  // load data when this page is loaded (for edit mode only) (unit and entity)
  useEffect(() => {
    getUnitData();

    if (!!id) {
      getData(id);
    }
  }, []);

  useEffect(() => {
    getEntityData();
    if (!!id) {
      getData(id);
    }
  }, []);

  // read other collections from Firestore (unit collection)
  const getUnitData = () => {
    db.collection("unit").onSnapshot((snapshot) => {
      setUnits(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id, // preprend doc Id
            ...doc.data(),
          };
        })
      );
    });
  };

  // read other collections from Firestore (entity collection)
  const getEntityData = () => {
    db.collection("entity").onSnapshot((snapshot) => {
      setEntities(
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
    db.collection("metric")
      .doc(id)
      .get()
      .then((snapshot) => {
        const doc = snapshot.data();
        console.log(doc);
        setName(doc.name);
        setType(doc.type);
        setCategory(doc.category);
        setUnit(doc.unit);
        setUnitLabel(doc.unitLabel);
        setEntity(doc.entity);
        setEntityLabel(doc.entityLabel);
        setSource(doc.source);
        setSchedule(doc.schedule);
      })
      .catch((ex) => {
        console.log("Exception: " + ex);
      });
  };

  const saveUnit = (unit) => {
    setUnit(unit);
    setUnitLabel(units.find((u) => u.id === unit).name);
  };

  const saveEntity = (entity) => {
    setEntity(entity);
    setEntityLabel(entities.find((u) => u.id === entity).name);
  };

  // save doc to Firestore
  const saveData = () => {
    if (!!id) {
      // edit existing doc
      db.collection("metric")
        .doc(id)
        .set({
          name,
          type,
          category,
          unit,
          unitLabel,
          entity,
          entityLabel,
          source,
          schedule,
        })
        .then(history.push("/admin/metrics"));
    } else {
      // create new doc
      db.collection("metric")
        .doc()
        .set({
          name,
          type,
          category,
          unit,
          unitLabel,
          entity,
          entityLabel,
          source,
          schedule,
        })
        .then(history.push("/admin/metrics"));
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
        <FormLabel>Type</FormLabel>
        <Select
          placeholder="Select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Manual">Manual</option>
          <option value="Automated">Automated</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Qualitative">Qualitative</option>
          <option value="Quantitative">Quantitative</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Unit</FormLabel>
        <Select
          placeholder="Select"
          value={unit}
          onChange={(e) => saveUnit(e.target.value)}
        >
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Entity</FormLabel>
        <Select
          placeholder="Select"
          value={entity}
          onChange={(e) => saveEntity(e.target.value)}
        >
          {entities.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Owner/Source</FormLabel>
        <Select
          placeholder="Select from existing entity list"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="test">Unavailable for now</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Schedule</FormLabel>
        <Input
          placeholder="Schedule"
          size="md"
          type="datetime-local"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
      </FormControl>
      <Button onClick={saveData}>Save</Button>
    </Box>
  );
}
