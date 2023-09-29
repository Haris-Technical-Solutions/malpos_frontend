import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { LabelField } from "../../components/fields";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { useLocation } from "react-router-dom";
import { Box } from "../../components/elements";
export default function UnitCreate() {
  const [unitData, setUnitData] = useState({
    name: "",
    equal: "",
    unit: "",
  });
  const [unitOptions, setUnitOptions] = useState([]);
  const [editUomId, setEditUomId] = useState();
  const [action, setAction] = useState();
  const [currentUom, setCurrentUom] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const location = useLocation();
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchUoms();
    if (location.state?.id) {
      setEditUomId(location.state.id);
      setAction(location.state.action);
      fetchUomById(location.state.id);
    }
  }, [location.state]);

  const fetchUomById = async (id) => {
    try {
      const res = await axiosInstance.get(`/uom/${id}/edit`);
      setUnitData(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUoms = async () => {
    try {
      const res = await axiosInstance.get(`/uom`);
      console.log(res.data.data.data, "result are here");
      setUnitOptions(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const postData = {
      name: unitData.name,
      equal: unitData.equal,
      unit: unitData.unit,
    };

    axiosInstance
      .post("/uom", postData)
      .then((response) => {
        console.log("Unit of measurement created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating unit of measurement:", error);
      });
  };

  const handleSelectedUnit = (e) => {
    const { name, value } = e.target;
    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Col md={12}>
                <Row>
                  {
                    <Col md={12}>
                      <CardLayout>
                        {action === "updateUom" ? "Update UOMs" : "Create UOMs"}
                      </CardLayout>
                    </Col>
                  }
                  <Col md={4}>
                    <LabelField
                      type="text"
                      name="name"
                      value={unitData?.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      label="Name"
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      type="number"
                      name="equal"
                      value={unitData.equal}
                      onChange={handleInputChange}
                      placeholder="Equal"
                      label="Equal"
                    />
                  </Col>
                  <Col md={4}>
                    <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                      <Form.Group>
                      <Form.Label>Unit</Form.Label>
                        <Form.Control
                          as="select"
                          name="uom_id"
                          type="select"
                          value={unitData.unit} // Set the value to preselect
                          onChange={(e) => {
                            handleSelectedUnit(e);
                          }}
                        >
                          <option value="">Select</option>
                          {unitOptions.map((option) => (
                            <option
                              key={option.md_uoms_id}
                              value={option.md_uoms_id}
                            >
                              {option.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Box>
                  </Col>

                  <Link to="/unit-measurement" style={{ float: "left" }}>
                    <Button
                      className="acc-create-btn rs-btn-create"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Link>
                </Row>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
