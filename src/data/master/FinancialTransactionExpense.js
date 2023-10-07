import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Input } from "../../components/elements";
import InputGroup from "react-bootstrap/InputGroup";

import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LabelFieldS from "../../components/fields/LabelFieldS";
import { IconField, LabelTextarea, LabelField } from "../../components/fields";

export default function TransactionExpense() {
  const [dateTouched, setDateTouched] = useState(false);
  const [date, setDate] = useState("");
  
  const [categoryTouched, setCategoryTouched] = useState(false);
  const nameInputRef = useRef(null);

  // useEffect(() => {
  //   nameInputRef.current.focus();
  // }, []);
  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleDateBlur() {
    setDateTouched(true);
  }
  
  useEffect(() => {
    setCategoryTouched(true);
  }, []);
  return (
    <Col md={12}>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={4} >
              <Form.Label   
                >Amount</Form.Label>
              
                <Form.Control
                    placeholder="Enter Amount"
                  //ref={nameInputRef}
                  label="Amount"
                  className="wfield"
               />
              </Col>

            <Col md={4}  >
              <LabelFieldS
              // style={{width:"80%"}}
label=" Account Type"
className="wfield"
option={[
                  { label: "Assets", value: null },
                  { label: "Liability", value: null },
                  { label: "Owner Equity", value: null },
                  { label: "Expense", value: null },
                  { label: "Revenue", value: null },
                ]}
                 />
            </Col>
            
            <Col md={4}    >
              <Form.Label>Date</Form.Label>
              <Form.Control
                // style={{width:"80%"}}
                // className="m-      
                className="wfield"
                label="calender"
                type="date"
                required
                value={date}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
                isInvalid={dateTouched && date.trim() === ""}
              />
              <Form.Control.Feedback type="invalid">
                Must not be empty
              </Form.Control.Feedback>
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Bank/Cash Account "
                placeholder="Bank Amount"
                // style={{width:"80%"}}
                type="text"
                className="wfield"
  
              />
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Accounts"
                placeholder="Accounts"
                type="text"
                className="wfield"
                // style={{width:"80%"}}
              />
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Empolyee"
                type="text"
                className="wfield"
                placeholder="Enter employee"
                // style={{width:"80%"}}
              />
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Supplier"
                type="text"
                placeholder="Enter supplier"
                // style={{width:"80%"}}
                className="wfield"
              />
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Customer"
                placeholder="Enter customer"
                type="text"
                className="wfield"
              />
            </Col>
          </Row>
          <Col md={12}>
            <Box className="head-sec-rearrange-right">
              <Box className="rearrange-right">
                <Link
                  to={"/transactions"}
                  style={{ display: "block", marginTop: "15px" }}
                >
                  {" "}
                  <button className="head-sec-rearrange-btn">
                    <FontAwesomeIcon icon={faCheck} />
                    &nbsp; Save
                  </button>
                </Link>
              </Box>
            </Box>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}
