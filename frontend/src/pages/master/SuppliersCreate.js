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
            <CardLayout>Create Supplier</CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={6}>
                  <LabelField
                    type="text"
                    value={currentSupplier.supplier_name}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        supplier_name: e.target.value,
                      })
                    }
                    placeholder={"Supplier Name"}
                  />
                  <LabelField
                    type="number"
                    value={currentSupplier.phone}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        phone: e.target.value,
                      })
                    }
                    placeholder={"Phone"}
                  />
                  <LabelField
                    type="text"
                    value={currentSupplier.tin}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        tin: e.target.value,
                      })
                    }
                    placeholder={"Tin"}
                  />
                  <LabelField
                    type="text"
                    value={currentSupplier.description}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        description: e.target.value,
                      })
                    }
                    placeholder={"Description"}
                  />
                  <Box className={"storageEdit-switch"}>
                    <Form.Check
                      className="switch"
                      type="switch"
                      id="custom-switch"
                      label="Status"
                      checked={currentSupplier.is_active === "1"}
                      onChange={handleSwitchChange}
                    />
                  </Box>
                  <Button variant="primary" onClick={handleCreateSupplier}>
                    Create
                  </Button>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
