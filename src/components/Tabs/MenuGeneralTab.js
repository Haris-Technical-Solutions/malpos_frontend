import React from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import { LabelField } from "../fields";

import { Box } from "../elements";
import ColorDivs from "./ColorDivs";
import { FormLabel } from "react-bootstrap";
import { useState } from "react";
export default function MenuGeneralTab() {
  const [show, setShow] = useState(false);
  const [imgfile, setImgFile] = useState([]);
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showDetails = () => {
    setShow(!show);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImgFile([...imgfile, reader.result]);
    };

    reader.readAsDataURL(file);
  };
  const handleImageRemove = (index) => {
    const newImgFile = [...imgfile];
    newImgFile.splice(index, 1);
    setImgFile(newImgFile);
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue > 1) {
      setErrorMessage(" Cannot be greater than 1");
    } else {
      setErrorMessage("");

      setValue(inputValue);
    }
  };
  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={5}>
              <LabelField
                type="text"
                label="Name"
                className="wfield"
                // fieldSize="w-100 h-md"
                required
                // value="Fish"
              />
            </Col>

            <Col md={5}>
              <LabelField
className="mfield"
style={{border:"1px solid silver"}}
                label="Parent Category"
                option={[
                  "Select Category",
                  "Sea food",
                  "Expresso",
                  "Ice drink",
                  "Pizza",
                ]}
                // fieldSize="w-100 h-md"
              />
            </Col>

            <Col md={6}>
              <FormLabel>Inactive</FormLabel>
              <Form.Check type="switch" id="custom-switch" label="" />
            </Col>
            <Col md={12}>
              <Row>
                <Col md={5}>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Label>Image</Form.Label>
                      <Box className="pl-img">
                        {imgfile.length === 0 ? (
                          <>
                            <input
                              type="file"
                              id="fileInput"
                              accept=".jpg, .jpeg, .png"
                              onChange={handleImageUpload}
                            />
                          </>
                        ) : (
                          <>
                            {imgfile.map((elem, index) => (
                              <span key={elem} style={{ display: "block" }}>
                                <button
                                  onClick={() => handleImageRemove(index)}
                                  style={{
                                    float: "right",
                                    marginBottom: "10px",
                                  }}
                                >
                                  ✖
                                </button>
                                <img
                                  src={elem}
                                  height="200"
                                  width="200"
                                  alt="med1"
                                  style={{ float: "left", marginRight: "10px" }}
                                />
                              </span>
                            ))}
                          </>
                        )}
                      </Box>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={5}>
                  <ColorDivs />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
