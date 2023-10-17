import React, {useState, useEffect, useRef} from 'react'
import { Col,Row, Form } from 'react-bootstrap'
// import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSave } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
import LabelFieldS from "../../components/fields/LabelFieldS";

export default function AccountCategoryedit  () {
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
            <Row>
                <Col md={12}>
              
                <Col md={12} style={{marginBottom:"2rem", display:"inline-flex"}} >
                   
                        Chart of Account / Edit
                        <Link to={"/account-categories"} style={{marginLeft:"59%"}} >
                      <button className="acc-create-btn" style={{padding:"10px 13px"}} >
                        <FontAwesomeIcon icon={faSave} /> {" "}Save
                      </button>
                    </Link>
                    <Link to={"/account-categories"} className='btnback'style={{marginBottom:"5px"}}> <button className="btnlk" > Back</button></Link>
                </Col>
                        <Row>
                            <Col md={12}>
                                <Row>
                                <Col md={4} >
                      <LabelFieldS
                      className="wfield"
                        label=" code"
                        type="number"
                        fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
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

                    <Col md={4}  >
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
                    <Col md={4}  >
                      <LabelFieldS
                      type="text"
                      className="wfield"
                        label=" Parent_Account"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}  >
                      <LabelFieldS
                        label=" Seqno"
                        type="number"
                        className="wfield"
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

            </Row>
        </PageLayout>
    </div>
  )
}

 
