import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import { useProduct } from "../../components/createProduct/productContext"; // Import the context

export default function SuppliersCreate() {
  const { form } = useProduct(); // Retrieve the context

  const [currentSupplier, setCurrentSupplier] = useState({
    supplier_name: "",
    phone: "",
    tin: "",
    description: "",
    is_active: "0",
    cd_branch_id: form.cd_branch_id, // Use context value
    cd_brand_id: form.cd_brand_id, // Use context value
    cd_client_id: form.cd_client_id, // Use context value
  });

  const handleSwitchChange = () => {
    setCurrentSupplier((prevSupplier) => ({
      ...prevSupplier,
      is_active: prevSupplier.is_active === "1" ? "0" : "1",
    }));
  };

  const handleCreateSupplier = () => {
    axiosInstance
      .post("/md_supplier", currentSupplier)
      .then((response) => {
        toast.success("Supplier created successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Supplier created successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error creating supplier", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error creating supplier", error);
      });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
  
              <Row>
          <Col md={12}>
            Create Supplier
                  <Button variant="dark" style={{marginLeft:"64%", padding:"7px 15px"}} onClick={handleCreateSupplier} >
                    Create
                  </Button>
                  <Link to={"/suppliers"} className='btnback'> <button className="btnlk"> Back</button></Link>
          </Col>
                
                  <Col md={4}>

                  <LabelField
                    className="wfield"
                    type="text"
                    style={{marginBottom:'1rem' }}
                    value={currentSupplier.supplier_name}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        supplier_name: e.target.value,
                      })
                    }
                    label={'Name:'}
                    placeholder={"Supplier Name"}
                    />
                    </Col>
                  
                  <Col md={4}>
                    <LabelField
                  label={'Phone Number:'}
                  type="number"
                  className="wfield"
                  style={{marginBottom:'1rem' }}
                  value={currentSupplier.phone}
                  onChange={(e) =>
                    setCurrentSupplier({
                      ...currentSupplier,
                      phone: e.target.value,
                    })
                  }
                  placeholder={"Phone"}
                  />
                  </Col>
                  
                  <Col md={4}>

                  <LabelField
                    type="text"
                    className="wfield"
                    value={currentSupplier.tin}
                    style={{marginBottom:'1rem' }}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        tin: e.target.value,
                      })
                    }
                    placeholder={"Tin"}
                    label={'Tin:'}
                    />
                    </Col>
                  
                  <Col md={4}>

                  <LabelField
                    type="text"
                    className="wfield"
                    style={{marginBottom:'1rem' }}
                    value={currentSupplier.description}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        description: e.target.value,
                      })
                    }
                    placeholder={"Description"}
                    label={'Description:'}
                    />
                    </Col>
                  <Col md={4} >
                  <Box className={"storageEdit-switch"}>
                    <Form.Check
                     style={{marginTop:'2rem' }}
                      className="switch"
                      type="switch"
                      
                      id="custom-switch"
                      label="Status"
                      checked={currentSupplier.is_active === "1"}
                      onChange={handleSwitchChange}
                    />
                  </Box>
                  </Col>
              </Row>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}