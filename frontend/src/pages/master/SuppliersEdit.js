import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import { useProduct } from "../../components/createProduct/productContext"; // Import the context

export default function SuppliersEdit() {
  const location = useLocation();
  const { form } = useProduct(); // Retrieve the context

  const [editSupplierId, setEditSupplierId] = useState();
  const [action, setAction] = useState();
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

  const handleUpdateSupplier = () => {
    axiosInstance
      .post(`/md_supplier/update/${editSupplierId}`, currentSupplier)
      .then((response) => {
        toast.success("Supplier updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Supplier updated successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error updating supplier", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error updating supplier", error);
      });
  };

  useEffect(() => {
    if (location.state?.id) {
      setEditSupplierId(location.state.id);
      setAction(location.state.action);

      const fetchSupplierById = async (id) => {
        try {
          const res = await axiosInstance.get(`/md_supplier/${id}/edit`);
          setCurrentSupplier(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchSupplierById(location.state.id);
    }
  }, [location.state]);

  return (
    <div>
      <PageLayout>
        <Row>
        {/*  <Col md={12}>
            <CardLayout>
            </CardLayout>
          </Col>*/}
          <Col  md={12}>
            <CardLayout>
              <Col style={{fontSize:'1.5rem', marginBottom:'1rem'}} md={12}>
              { action === "create" ? "Create Supplier" : "Edit Supplier"}
              </Col>
              <Row>
                <Col md={6}>
                  <LabelField
                  style={{marginBottom:'1rem' }}
                    type="text"
                    value={currentSupplier.supplier_name}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        supplier_name: e.target.value,
                      })
                    }
                    placeholder={"Supplier Name"}
                    label={'Name:'}
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
                    style={{marginBottom:'1rem' }}
                    label={'Phone Number:'}
                    placeholder={"Phone"}
                  />
                  <LabelField
                    type="text"
                    style={{marginBottom:'1rem' }}
                    value={currentSupplier.tin}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        tin: e.target.value,
                      })
                    }
                    label={'Tin:'}
                    placeholder={"Tin"}
                  />
                  <LabelField
                    type="text"
                    style={{marginBottom:'1rem' }}

                    value={currentSupplier.description}
                    onChange={(e) =>
                      setCurrentSupplier({
                        ...currentSupplier,
                        description: e.target.value,
                      })
                    }
                    label={'Description'}
                    placeholder={"Description"}
                  />
                  <Box className={"storageEdit-switch"}>
                    <Form.Check
                    style={{marginBottom:'1rem' }}
                      className="switch"
                      type="switch"
                      id="custom-switch"
                      label="Status"
                      checked={currentSupplier.is_active === "1"}
                      onChange={handleSwitchChange}
                    />
                  </Box>
                  {action === "create" ? (
                    <Button variant="primary" onClick={handleUpdateSupplier}>
                      Create
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleUpdateSupplier}>
                      Update
                    </Button>
                  )}
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
