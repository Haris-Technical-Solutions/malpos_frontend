import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../elements";
import { Link } from "react-router-dom";

export default function CategoryTable({ thead, tbody }) {
  const [alertModal, setAlertModal] = useState(false);
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    setData(tbody);
  }, [tbody]);

  const toggleRow = (index) => {
    const newExpandedRows = [...expandedRows];
    if (newExpandedRows.includes(index)) {
      // Collapse the row by removing it from the expandedRows array
      newExpandedRows.splice(newExpandedRows.indexOf(index), 1);
    } else {
      // Expand the row by adding it to the expandedRows array
      newExpandedRows.push(index);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <Box className="mc-table-responsive">
      <Table className="mc-table product">
        <Thead className="mc-table-head">
          <Tr>
            {thead.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody className="mc-table-body even">
          {data?.map((item, index) => (
            <React.Fragment key={index}>
              <Tr>
              <td onClick={() => toggleRow(index)} className="name-clickable">
                  <Box className="mc-table-product md">
                    <Image src={item.src} alt={item.alt} />
                  </Box>
                </td>
                <Td className="expand-button" onClick={() => toggleRow(index)}>
                {item.heading}
                </Td>

                <Td>
                  <Box className="mc-table-price">
                    <td>{item.visibility}</td>
                  </Box>
                </Td>
                <Td>{item.count}</Td>
                <Td>
                  <Box className="mc-table-action">
                    <Link
                      to="/product-view"
                      state={{ id: `${item.id}` }}
                      title="View"
                      className="material-icons view"
                    >
                      {item.action.view}
                    </Link>
                    <Link
                      to={`/${item.id}`}
                      title="Edit"
                      className="material-icons edit"
                    >
                      {item.action.edit}
                    </Link>
                    <Button
                      title="Delete"
                      className="material-icons delete"
                      onClick={() => setAlertModal(true)}
                    >
                      {item.action.delete}
                    </Button>
                  </Box>
                </Td>
              </Tr>
              {expandedRows.includes(index) && (
                <Tr>
                  <Td>
                  <Image style={{width:"40px"}} src={item.src} alt={item.alt} />
                  </Td>
                  <Td>
                  {item.heading}
                  </Td>

                  <Td>
                  {item.visibility}
                  </Td>
                  <Td>
                  {item.count}
                  </Td>
                  <Td>
                   {" Content for the expanded row"}
                    <Text>{item.additionalDetails}</Text>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>

      <Modal show={alertModal} onHide={() => setAlertModal(false)}>
        <Box className="mc-alert-modal">
          <Icon type="new_releases" />
          <Heading as="h3">Are you sure?</Heading>
          <Text as="p">Want to delete this product?</Text>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setAlertModal(false)}
            >
              No, close
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setAlertModal(false)}
            >
              Yes, delete
            </Button>
          </Modal.Footer>
        </Box>
      </Modal>
    </Box>
  );
}
