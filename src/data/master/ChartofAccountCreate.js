import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
import { Box, Input } from "../../components/elements";

import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LabelFieldS from "../../components/fields/LabelFieldS";

export default function CategoriesCreate() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleNameBlur() {
    setNameTouched(true);
  }
  return (
    <div>
      <PageLayout>
    
          <Col md={12}>
      
              <Row>
          <Col md={12} style={{display:"inline-flex"}} >
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3 style={{ width: "500px", fontSize:"1.1rem" }}>
                    <Link to="/account-categories" style={{ color: "#edb213" }}>
                      Chart Of Accounts
                    </Link>
                    /Create
                  </h3>
                </Box>
                </Box>
                    <Link style={{marginLeft:"35%", backgroundColor:"black", borderRadius:"4px"}}
                      to={"/account-categories"}
                      // style={{ display: "block" }}
                    >
                      {" "}
                      <button className="head-sec-rearrange-btn" style={{color:"white", padding:"10px 12px",fontSize:"13px"}}>
                        <FontAwesomeIcon icon={faCheck} />
                        &nbsp; Save
                      </button>
                    </Link>
                    <Link to={"/account-categories"} className='btnback'> <button className="btnlk"> Back</button></Link>
          </Col>
                <Col md={12}>
                  <Row>
                  <Col md={4}>
                      <LabelFieldS
                        label=" code"
                        className="wfield"
                        type="number"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        // className="m-0"
                        className="wfield"
                        label="Name"
                        type="text"
                        required
                        value={name}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        isInvalid={nameTouched && name.trim() === ""}
                        ref={nameInputRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        Must not be empty
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={4} >
                      <LabelFieldS
                            className="wfield"
                        label=" Type"
                        option={[
                          { label: "Assets", value: null },
                          { label: "Libility", value: null },
                          { label: "Owner", value: null },
                          { label: "Equity", value: null },
                          { label: "Expense", value: null },
                          { label: "Revenue", value: null },
                          
                        ]}
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <LabelFieldS
                      type="text"
                      className="wfield"
                        label=" Parent_Account"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4} >
                      <LabelFieldS
                            className="wfield"
                        label=" Seqno"
                        type="number"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}  >
                      <LabelFieldS
                        label=" Summary"
                        className="wfield"
                        // fieldSize="w-100 h-md"
                        option={[
                          { label: "Yes", value: null },
                          { label: "No", value: null },
                          
                        ]}
                    />
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
      </PageLayout>
    </div>
  );
}
