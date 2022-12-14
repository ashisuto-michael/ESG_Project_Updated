import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
    IconButton,
  } from "@chakra-ui/react";
  import {BrowserRouter as Router, Link} from 'react-router-dom';
  import React, { useMemo } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

  // Custom components
  import Card from "components/card/Card";
  import Menu from "components/menu/MainMenu";
  
  // Assets
  import {SiGumtree} from "react-icons/si";
  import {BsPeople, BsBuilding} from "react-icons/bs";
  export default function ColumnsTable(props) {
    // params passed to table:
    // 1. columns
    // 2. rows
    // 3. update row function
    // 4. delete row function
    const { columnsData, tableData, updateData, deleteData } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 5;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' justify='space-between' mb='20px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            Material Topics
          </Text>
        
        {/* <Menu /> */}
        <Link to="/admin/material-topic">
          <Button colorScheme='blue'>Create New</Button>
        </Link>
          
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
                <Th>
                  Actions
                </Th>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "ID") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "NAME") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "CLASSIFICATION") {
                      data = (
                        <Flex align='center'>
                          <Icon
                            w='24px'
                            h='24px'
                            me='5px'
                            color={
                              cell.value === "Environmental"
                                ? "green.500"
                                : cell.value === "Social"
                                ? "yellow.500"
                                : cell.value === "Corporate Governance"
                                ? "blue.500"
                                : null
                            }
                            as={
                              cell.value === "Environmental"
                                ? SiGumtree
                                : cell.value === "Social"
                                ? BsPeople
                                : cell.value === "Corporate Governance"
                                ? BsBuilding
                                : null
                            }
                          />
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else  if (cell.column.Header === "IMPORTANCE TO BUSINESS") {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        );
                    } else  if (cell.column.Header === "IMPORTANCE TO STAKEHOLDERS") {
                        data = (
                          <Text color={textColor} fontSize='sm' fontWeight='700'>
                            {cell.value}
                          </Text>
                        );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                  <Td>
                    <IconButton aria-label='Edit' icon={<EditIcon />} onClick={() => updateData(row.values.id)} />
                    <IconButton aria-label='Delete' icon={<DeleteIcon />} onClick={() => deleteData(row.values.id)} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Card>
    );
  }
  