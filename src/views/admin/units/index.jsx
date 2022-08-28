// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";

import UnitsTable from "views/admin/units/components/UnitsTable";
import { columnsData } from "views/admin/units/variables/columnsData";
//import tableData from "views/admin/units/variables/tableData.json";
import React, { useState, useEffect } from "react";
import { db } from "../../../lib/firebase";
import { useHistory } from "react-router-dom";

export default function Units() {
  // use state hook to keep track of the loaded data and a function to update it
  const [units, setUnits] = useState([]);

  // for page navigation
  const history = useHistory();

  // load data when this page is loaded
  useEffect(() => {
    getAllData();
  }, []);

  // read snapshot from Firestore (auto refresh whenever there's new update)
  const getAllData = () => {
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

  // update a single doc in Firestore
  const updateData = (id) => {
    console.log(`edit doc #${id}`);
    // go to edit page
    history.push("/admin/unit/" + id);
  };

  // delete a single doc in Firestore
  const deleteData = (id) => {
    console.log(`delete doc #${id}`);
    db.collection("unit")
      .doc(id)
      .delete(() => {
        alert("Deleted ${id}");
      });
  };

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <UnitsTable
        columnsData={columnsData}
        tableData={units}
        updateData={updateData}
        deleteData={deleteData}
      />
    </Box>
  );
}
