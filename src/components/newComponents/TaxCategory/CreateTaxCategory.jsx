import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../api/baseUrl";
// import { CardLayout } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import { LabelField } from "../../../components/fields";
import api from "../../../api/baseUrl";
import SelectField from "../../../components/fields/SelectField";

export default function CreateTaxCategory() {
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [clients, setClients] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
   cd_clinet_id:"",
    cd_brand_id: "",
    cd_branch_id: "",
    description: "",
    name: "",
  });

  const location = useLocation();

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

    const fetchClients = async () => {
      try {
        const res = await axiosInstance.get("/cdclients");
        const formattedData = formatData(res.data, "cd_client_id");
        setClients(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

  const fetchBrands = async () => {
    try {
      const res = await api.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranches(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleCheckChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       is_active: e.target.checked,
  //     });
  //   };

  const handleClinetChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_clinet_id: parseInt(e.target.value),
    }));
  };
  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };

  const handleBranchChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_branch_id: parseInt(e.target.value),
    }));
  };

  const fetchTaxCategoryData = async () => {
    if (editId) {
      try {
        const response = await api.get(`/tax_category_edit/${editId}`);
        const taxCategoryData = response.data;
        setFormData({
          name: taxCategoryData.name,
          cd_clinet_id: taxCategoryData.cd_clinet_id,
          cd_brand_id: taxCategoryData.cd_brand_id,
          cd_branch_id: taxCategoryData.cd_branch_id,
          description: taxCategoryData.description,
        });
      } catch (error) {
        console.log(error, "Error retrieving tax category data");
      }
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      setEditId(location.state?.id);
    }
    fetchBranches();
    fetchBrands();
    fetchClients();
    fetchTaxCategoryData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
      };

      let response;

      if (editId) {
        response = await api.post(
          `/tax_category_update/${editId}`,
          updatedFormData
        );
        toast.success("Tax Category edited successfully", {
          autoClose: true,
        });
      } else {
        // Create request
        response = await api.post("/tax_category_store", updatedFormData);
        toast.success("Tax Category created successfully", {
          autoClose: true,
        });
      }
    } catch (error) {
      console.error("Error creating/updating Tax Category", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12} style={{display:'flex'}}>
              {/* <CardLayout> */}
                <h3>Create Tax Category</h3>
                    <button style={{marginLeft:"55%"}} className="cus-btn" type="submit">
                      Create
                    </button>
                    <Link to="/tax-category">
                      <button
                        className="cus-btn-bor"
                        style={{
                          backgroundColor: "#F07632",
                          color: "white",
                          borderColor: "#F07632",
                        }}
                      >
                        Back
                      </button>
                    </Link>
                
              {/* </CardLayout> */}
            </Col>
            </Row>
            <Col md={12} className="mt-4">
              {/* <CardLayout> */}
                <Row>
             
                    <Col md={4}>
                      <SelectField
                        label="Clinet"
                        className="wfield"
                        name="cd_clinet_id"
                        options={clients}
                        value={formData.cd_clinet_id} 
                        onChange={handleClinetChange}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                        label="Brand"
                        className="wfield"
                        name="cd_brand_id"
                        options={brands}
                        value={formData.cd_brand_id}
                        onChange={handleBrandChange}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                        label="Branch"
                        className="wfield"
                        name="cd_branch_id"
                        options={branches}
                        value={formData.cd_branch_id}
                        onChange={handleBranchChange}
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="text"
                        className="wfield"
                        placeholder="Name"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="text"
                        className="wfield"
                        placeholder="Description"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

            
              {/* </CardLayout> */}
            </Col>
          
        </form>
      </PageLayout>
    </div>
  );
}
