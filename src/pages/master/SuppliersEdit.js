import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import SelectField from "../../components/fields/SelectField";
import { useProduct } from "../../components/createProduct/productContext"; // Import the context

export default function SuppliersEdit() {
  const location = useLocation();
  const [editSupplierId, setEditSupplierId] = useState();
  const [action, setAction] = useState();
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currentSupplier, setCurrentSupplier] = useState({
    supplier_name: "",
    phone: "",
    tin: "",
    description: "",
    is_active: "0",
    cd_branch_id:1 ,
    cd_brand_id:1, 
    cd_client_id: 1,
  });
  const branchesOptions =
  branches != undefined &&
  branches?.map((item) => ({
    label: item.name,
    value: item.cd_branch_id,
  }));
const brandsOptions =
  brands != undefined &&
  brands?.map((item) => ({
    label: item.name,
    value: item.cd_brand_id,
  }));
  const clientsOptions =
  clients != undefined &&
  clients?.map((item) => ({
    label: item.name,
    value: item.cd_client_id,
  }));
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
    fetchClients();
    fetchBrands();
    fetchBranches();
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

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      console.log(res.data, "cdclients");
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      console.log(res.data, "cdbranch");
      setBranches(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      setBrands(res.data);
      console.log(res.data, "cdbrand");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
        <CardLayout>
          <Row>
        <Col md={12} >
          {action === "updateSupplier" ? "Create Supplier" : "Update Supplier"}
              {action === "create" ? (
                <Button
                variant="dark"
                  className="submit-button"
                  onClick={handleUpdateSupplier}
                >
                  Create
                </Button>
              ) : (
                <Button
                variant="dark"
                style={{marginLeft:"64%", padding:"7px 15px"}}
                  onClick={handleUpdateSupplier}
                >
                  Update
                </Button>
              )}
              <Link to={"/suppliers"} className='btnback'> <button className="btnlk"> Back</button></Link>
        </Col>

          {/* Rest of your component code */}
        
            {/* ... */}
            <Col md={4}>
              <LabelField
                type="text"
                
                className="label-field wfield"
                value={currentSupplier.supplier_name}
                onChange={(e) =>
                  setCurrentSupplier({
                    ...currentSupplier,
                    supplier_name: e.target.value,
                  })
                }
                placeholder="Supplier Name"
                label="Name:"
              />
            </Col>
            <Col md={4}>
              <LabelField
                type="number"
                className="label-field wfield"
                value={currentSupplier.phone}
                onChange={(e) =>
                  setCurrentSupplier({
                    ...currentSupplier,
                    phone: e.target.value,
                  })
                }
                label="Phone Number:"
                placeholder="Phone"
              />
            </Col>
            <Col md={4}>
              <LabelField
                type="text"
                className="label-field wfield"
                value={currentSupplier.tin}
                onChange={(e) =>
                  setCurrentSupplier({
                    ...currentSupplier,
                    tin: e.target.value,
                  })
                }
                label="Tin:"
                placeholder="Tin"
              />
            </Col>
            <Col md={4}>
              <LabelField
                type="text"
                className=" wfield"
                value={currentSupplier.description}
                onChange={(e) =>
                  setCurrentSupplier({
                    ...currentSupplier,
                    description: e.target.value,
                  })
                }
                label="Description:"
                placeholder="Description"
              />
            </Col>
            <Col md={4}>
              <div className="switch">
                <Form.Check
                style={{marginTop:"2rem"}}
                  type="switch"
                  id="custom-switch"
                  label="Status"
                  checked={currentSupplier.is_active === "1"}
                  onChange={handleSwitchChange}
                />
              </div>
            </Col>
      
  
        
        </Row>
  </CardLayout>
  </Col>
  </Row>
      </PageLayout>
    </div>
);
}