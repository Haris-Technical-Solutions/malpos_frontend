import React, { useState, useEffect } from "react";
import { Col, Row, InputGroup, Form, Button } from "react-bootstrap";
import { Box } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import axiosInstance from "../../api/baseUrl";
import LabelFieldS from "../../components/fields/LabelFieldS";
import PageLayout from "../../layouts/PageLayout";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SelectField from "../../components/fields/SelectField";
import { useLocation , useNavigate} from "react-router-dom";


export default function MCustomerCreate() {
  const navigate=useNavigate();
  const location = useLocation();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [gender, setGender] = useState("Male");
  const [editcustomerId, setEditcustomerId] = useState();
  const [unitData, setUnitData] = useState({
    cd_client_id: 1,
    cd_brand_id: 1,
    cd_branch_id: 1,
    md_customer_group_id: 2,
    name: "",
    email: "",
    address: "",
    phone: "",
    description: "",
    country: "",
    gender: gender,
    city: "",
    dob: "",
    is_active: "1",
    created_by: "1",
    updated_by: "1",
  });

  const [brands, setBrands] = useState([]);
  const [action, setAction] = useState("create");
  const [branches, setBranches] = useState([]);
  const [customergroupid, setCustomergroupid] = useState([]);
  const [clients, setClients] = useState([]);
  const clientsOptions =
    clients != undefined &&
    clients?.map((item) => ({
      label: item.name,
      value: item.cd_client_id,
    }));
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
  const customergroupoption =
    customergroupid != undefined &&
    customergroupid?.map((item) => ({
      label: item.group_name,
      value: item.id,
    }));
  const Countriesoption =
    countries != undefined &&
    countries?.map((item, index) => ({
      label: item,
      value: item,
    }));

  const Cityoption =
    cities != undefined &&
    cities?.map((item, index) => ({
      label: item,
      value: item,
    }));
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const fetchcustomerById = async (id) => {
    try {
      const res = await axiosInstance.get(`/md_customer/${id}/edit`);
      fetchCity(res.data.country)

      setUnitData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCountries = async () => {
    try {
      const res = await axiosInstance.get("/get_country");
      console.log(res.data, "get_country");
      setCountries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      console.log(res.data, "cdclients");
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCity = async (country) => {

    try {
      const res = await axiosInstance.get(`/get_city/${country}/`);
      console.log(res.data, "city");
      setCities(res.data);
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
  const fetchcustomergroupid = async () => {
    try {
      const res = await axiosInstance.get("/md_customer_group");
      console.log(res.data, "md_customer_group");
      setCustomergroupid(res.data);
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

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchCountries();
    fetchcustomergroupid();
    fetchBranches();
    if (location.state?.id) {
      fetchcustomerById(location.state?.id);
      setEditcustomerId(location.state?.id);
      setAction(
        location.state?.action === "updateCustomer" ? "update" : "create"
      );
    }
  }, [location.state]);

  // useEffect(() => {
  //   if (unitData.gender) {
  //     setGender(unitData.gender);
  //   }
  // }, [unitData])

  const [errors, setErrors] = useState({});

  const isEmailValid = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    if (name === "email" && !isEmailValid(value)) {
      setErrors({ ...errors, [name]: "*Invalid email format" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    if(name =='country'){
      fetchCity(value);
    }
    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateCustomer = () => {
    const updatedcustomerData = {
      name: unitData.name,
      email: unitData.email,
      address: unitData.address,
      phone: unitData.phone,
      description: unitData.description,
      country: unitData.country,
      gender: unitData.gender,
      city: unitData.city,
      dob: unitData.dob,
      is_active: "1",
      created_by: "1",
      updated_by: "1",
      md_customer_group_id: unitData.md_customer_group_id,
      cd_branch_id: unitData.cd_branch_id,
      cd_brand_id: unitData.cd_brand_id,
      cd_client_id: unitData.cd_client_id,
    };

    const apiEndpoint = editcustomerId
      ? `/md_customer/update/${editcustomerId}`
      : "/md_customer";

    axiosInstance
      .post(apiEndpoint, updatedcustomerData)
      .then((response) => {
        toast.success("customer created successfully", {
          position: "top-right",
          autoClose: 3000,
        });
navigate("/customer")
        console.log("customer updated successfully", response.data);
        
      })
      .catch((error) => {
        toast.error("Error updating customer", {
          position: "top-right",
          autoClose: 3000,
        });

        console.error("Error updating customer", error);
      });
  };

  // const handleSubmit = () => {
  //   axiosInstance
  //     .post("/md_customer", unitData)
  //     .then((response) => {
  //       console.log("Customer created:", response.data);
  //       toast.success("Customer added successfully", {
  //         autoClose: true,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error creating Customer:", error);
  //       toast.error("Error creating Customer. Please try again.", {
  //         autoClose: true,
  //       });
  //     });
  // };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12} style={{ display: "inline-flex" }}>
            {action === "create" ? "Create Customer" : "Update Customer"}

            {/* <Link to={""} style={{ marginLeft: "65%" }}> */}
              {" "}
              <button
                className="add-product-btn-pl"
                style={{ backgroundColor: "black" ,marginLeft: "65%" }}
                onClick={handleUpdateCustomer}
              >
                {action === "create" ? "Create" : "Update"}
              </button>
            {/* </Link> */}

            <Link to={"/customer"} className="btnback">
              {" "}
              <button className="btnlk"> Back</button>
            </Link>
          </Col>

          <Col md={12}>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={4}>
                    <SelectField
                      className="wfield"
                      // className="w-50"
                      label="Client"
                      name="client"
                      options={clientsOptions}
                      value={unitData?.cd_client_id}
                      onChange={handleInputChange}
                    />
                    {errors.cd_client_id && (
                      <span className="error-message">
                        {errors.cd_client_id}
                      </span>
                    )}
                  </Col>
                  <Col md={4}>
                    <SelectField
                      className="wfield"
                      required
                      label="Brand"
                      name="brand"
                      type="select"
                      title="Brand"
                      options={brandsOptions}
                      value={unitData?.cd_brand_id}
                      onChange={handleInputChange}
                    />
                    {errors.cd_brand_id && (
                      <span className="error-message">
                        {errors.cd_brand_id}
                      </span>
                    )}
                  </Col>
                  <Col md={4}>
                    <SelectField
                      className="wfield"
                      required
                      label="Branch"
                      name="branch"
                      type="select"
                      title="Branch"
                      options={branchesOptions}
                      value={unitData?.cd_branch_id}
                      onChange={handleInputChange}
                    />
                    {errors.cd_branch_id && (
                      <span className="error-message">
                        {errors.cd_branch_id}
                      </span>
                    )}
                  </Col>
                  <Col md={4}>
                    <SelectField
                      className="wfield"
                      required
                      label="Customer group"
                      name="customergroup"
                      type="select"
                      title="customer group"
                      options={customergroupoption}
                      value={unitData?.id}
                      onChange={handleInputChange}
                    />
                    {errors.id && (
                      <span className="error-message">{errors.id}</span>
                    )}
                  </Col>
                  <Col md={4}>
                    <LabelField
                      type={"text"}
                      placeholder={"Name"}
                      value={unitData?.name}
                      name="name"
                      onChange={handleInputChange}
                      className="wfield"
                      label={"Name"}
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </Col>

                  <Col md={4}>
                    <LabelField
                      type={"email"}
                      placeholder={"Email"}
                      value={unitData?.email}
                      name="email"
                      onChange={handleInputChange}
                      className="wfield"
                      label={"Email"}
                    />
                    {errors.email && (
                      <span
                        className="error-message"
                        style={{ color: "red", fontSize: "10px" }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </Col>

                  <Col md={4}>
                    <LabelField
                      type={"number"}
                      placeholder={"Phone number"}
                      value={unitData?.phone}
                      name="phone"
                      onChange={handleInputChange}
                      className="wfield"
                      label={"Phone Number"}
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                  </Col>
                  <Col md={4}>
                    <LabelField
                      type={"date"}
                      className="wfield"
                      value={unitData?.dob}
                      name="dob"
                      onChange={handleInputChange}
                      placeholder={"Date of Birth"}
                      label={"Date of Birth"}
                    />
                    {errors.dob && (
                      <span className="error-message">{errors.dob}</span>
                    )}
                  </Col>
                  <Col md={4}>
                    <LabelField
                      className="wfield"
                      type={"text"}
                      value={unitData?.address}
                      name="address"
                      onChange={handleInputChange}
                      placeholder={"Address"}
                      label={"Address"}
                    />
                    {errors.address && (
                      <span className="error-message">{errors.address}</span>
                    )}
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        className="wfield"
                        name="gender"
                        value={gender}
                        onChange={handleGenderChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <SelectField
                      className="wfield"
                      required
                      label="Country"
                      name="country"
                      type="select"
                      title="country"
                      options={Countriesoption}
                      value={unitData?.country}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      className="wfield"
                      required
                      label="City"
                      name="city"
                      type="select"
                      title="city"
                      options={Cityoption}
                      value={unitData?.city}
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col md={4}>
                    <LabelField
                      type={"description"}
                      className="wfield"
                      value={unitData?.description}
                      name="description"
                      onChange={handleInputChange}
                      placeholder={"detail of customer"}
                      label={"Description"}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
