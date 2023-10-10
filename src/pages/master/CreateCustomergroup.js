import React, {useState,useEffect} from 'react'
import PageLayout from '../../layouts/PageLayout'
import { Row,Col,Button } from 'react-bootstrap'
import { LabelField } from '../../components/fields'
import {Link, useLocation} from "react-router-dom"
import { toast } from 'react-toastify'
import SelectField from '../../components/fields/SelectField'
import axiosInstance from "../../api/baseUrl";

const CreateCustomergroup = () => {
  const [unitData, setUnitData] = useState({
    cd_client_id: 1,
    cd_brand_id: 1,
    cd_branch_id: 1,
    group_name: "",
    discount: "",
    created_by: "1",
    updated_by: "1",
  });

  const location = useLocation();
  const [editcustomergroupId, setEditcustomergroupId] = useState();  
  const [brands, setBrands] = useState([]);
  const [action, setAction] = useState('create'); 
  const [branches, setBranches] = useState([]);
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

  const fetchcustomerById = async (id) => {
    try {
      const res = await axiosInstance.get(`/md_customer_group/${id}/edit`);
      setUnitData(res.data);
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

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    if (location.state?.id) {
      fetchcustomerById(location.state?.id);
      setEditcustomergroupId(location.state?.id);
      setAction(location.state?.action === 'updateCustomergroup' ? 'update' : 'create');
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateCustomergroup = () => {
    const updatedcustomergroupData = {
      group_name: unitData.group_name,
      discount: unitData.discount,
      is_active:"1",
      created_by: "1",
      updated_by: "1",
      cd_branch_id: unitData.cd_branch_id,
      cd_brand_id: unitData.cd_brand_id,
      cd_client_id: unitData.cd_client_id,
    };

    const apiEndpoint = editcustomergroupId ? `/md_customer_group/update/${editcustomergroupId}` : '/md_customer_group';

    axiosInstance
      .post(apiEndpoint, updatedcustomergroupData)
      .then((response) => {
        toast.success("customer group created successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        console.log("customer group updated successfully", response.data);
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
  //     .post("/md_customer_group", unitData)
  //     .then((response) => {
  //       console.log("Customer group created:", response.data);
  //       toast.success("Customer group added successfully", {
  //         autoClose: true,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error creating Customer:", error);
  //       toast.error("Error creating Customer group. Please try again.", {
  //         autoClose: true,
  //       });
  //     });
  // };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
              <Row>
       <Col md={12} style={{display:"inline-flex"}}>
            {action === "create" ? "Create Customer Group" : "Update Customer Group"}
                  <button type='button' className='add-product-btn-pl' style={{marginLeft:"57%",backgroundColor:"black"}} variant="dark" onClick={handleUpdateCustomergroup}  >
                  {action === 'create' ? 'Create' : 'Update'}
                  </button>
                
              
                {/* <Link  style={{marginLeft:"57%"}}>
                    <Button   
                    onClick={handleSubmit}
                    style={{padding:"7px 15px"}}
                    variant="dark"
                      // className="acc-create-btn rs-btn-create"
                      // onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Link> */}
              <Link  to={"/customer-group"} className='btnback'style={{ padding:"5px 20px"}} > <button className="btnlk"> Back</button></Link>
  
          </Col>
          <Col md={4} >
                    <SelectField
                    className="wfield"
                      // className="w-50"
                      label="Client"
                      name="client"
                      options={clientsOptions}
                      value={unitData?.cd_client_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4} >
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
                  </Col>
          <Col md={4}>
                  <LabelField
                    type="text"
                    className="wfield"
                    label={'Group Name'}
                    value={unitData?.group_name}
                    name="group_name"
                    onChange={handleInputChange}
                    placeholder={"Enter Name"}
                  />
</Col>

<Col md={4} >
                  <LabelField
                    type="text"
                    className="wfield"
                    value={unitData?.discount}
                    name="discount"
                    onChange={handleInputChange}
                    label={'Discount Value'}
                    placeholder={"0"}
                
                                  
                
                  />
</Col>
          </Row>
          </Col>
          </Row>
          </PageLayout>
          
    </div>
  )
}

export default CreateCustomergroup
