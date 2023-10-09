import React, {useState, useEffect} from 'react'
import { Col, Row, InputGroup, Form,Button } from 'react-bootstrap'
import { Box } from '../../components/elements'
import { LabelField, LabelTextarea } from '../../components/fields'
import axiosInstance from "../../api/baseUrl";
import LabelFieldS from '../../components/fields/LabelFieldS'
import PageLayout from '../../layouts/PageLayout'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import SelectField from '../../components/fields/SelectField';
import { useLocation } from 'react-router-dom';

export default function MCustomerCreate() {
   
  const location = useLocation();
  const [editcustomerId, setEditcustomerId] = useState();  
    const [unitData, setUnitData] = useState({
        cd_client_id: 1,
        cd_brand_id: 1,
        cd_branch_id: 1,
        md_customer_group_id:1,
        name: "",
        code: "",
        email: "",
        address:"",
        phone: "",
        description: "",
        country:1,
        gender:"",
         city:"",
        dob:"",
        is_active:"1",
        created_by: "1",
        updated_by: "1",
      });
      const [brands, setBrands] = useState([]);
      const [action, setAction] = useState('create');
      const [branches, setBranches] = useState([]);
      const [countries, setCountries] = useState([]);
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
      countries?.map((item) => ({
        label: item.name,
        value: item.gd_country_id,
      }));
    
      const fetchcustomerById = async (id) => {
        try {
          const res = await axiosInstance.get(`/md_customer/${id}/edit`);
          setUnitData(res.data);
        } catch (error) {
          console.log(error);
        }
      };
     const fetchCountries = async () => {
        try {
          const res = await axiosInstance.get("/gd_countries");
          console.log(res.data, "gd_countries");
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
        fetchcustomergroupid()
        fetchBranches();
        if (location.state?.id) {
          fetchcustomerById(location.state?.id);
          setEditcustomerId(location.state?.id);
          setAction(location.state?.action === 'updateCustomer' ? 'update' : 'create');
        }
      }, [location.state]);
      
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateCustomer = () => {
    const updatedcustomerData = {
      name: unitData.name,
      code:unitData.code,
      email: unitData.email,
      address:unitData.address,
      phone: unitData.phone,
      description: unitData.description,
      country:unitData.gd_country_id,
      gender:unitData.gender,
       city:unitData.city,
      dob:unitData.dob,
      is_active:"1",
      created_by: "1",
      updated_by: "1",
      md_customer_group_id:unitData.id,
      cd_branch_id: unitData.cd_branch_id,
      cd_brand_id: unitData.cd_brand_id,
      cd_client_id: unitData.cd_client_id,
    };

    const apiEndpoint = editcustomerId ? `/md_customer/update/${editcustomerId}` : "/md_customer";

    axiosInstance
      .post(apiEndpoint, updatedcustomerData)
      .then((response) => {
        toast.success("customer created successfully", {
          position: "top-right",
          autoClose: 3000,
        });

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
                    <Col md={12} style={{display:"inline-flex"}} >
                            {action === "create" ? "Create Customer" : "Update Customer"}
            
                  <button  className='add-product-btn-pl' style={{marginLeft:"60%", backgroundColor:"black"}} onClick={handleUpdateCustomer}>
                  {action === 'create' ? 'Create' : 'Update'}
                  </button>
                
              
              <Link to={"/customer"} className='btnback'> <button className="btnlk"> Back</button></Link>
                
                  
                    </Col>

                    <Col md={12}>
                    
                            <Row>
                                <Col md={12}>
                                    <Row>
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
                  <Col md={4} >
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
                  </Col>
                                        <Col md={4}>
                                            <LabelField type={'text'}
                                             placeholder={'Name'} 
                                           value={unitData?.name}
                                           name="name"
                                           onChange={handleInputChange}
                                             className="wfield"
                                             label={"Name"} />
                                        </Col>
                                        <Col md={4}>
                                            <LabelField type={'number'}
                                             placeholder={'Code'} 
                                             className="wfield"
                                             value={unitData?.code}
                                             name="code"
                                             onChange={handleInputChange}
                                             label={"Code"} />

                                        </Col>
                                        <Col md={4}>
                                            <LabelField type={'email'}
                                             placeholder={'Email'} 
                                             value={unitData?.email}
                                             name="email"
                                             onChange={handleInputChange}
                                             className="wfield" 
                                             label={"Email"} />
                                        </Col>
                                        <Col md={4}>
                                            <LabelField type={'number'}
                                             placeholder={'Phone number'} 
                                             value={unitData?.phone}
                                             name="phone"
                                             onChange={handleInputChange}
                                             className="wfield" 
                                             label={"Phone Number"} />
                                        </Col>
                                        <Col md={4}>
                                            <LabelField type={'date'}
                                             className="wfield"
                                             value={unitData?.dob}
                                             name="dob"
                                             onChange={handleInputChange}
                                              placeholder={'Date of Birth'} 
                                              label={"Date of Birth"} />
                                        </Col>
                                        <Col md={4}>
                                            <LabelField className="wfield"
                                             type={'text'} 
                                             value={unitData?.address}
                                             name="address"
onChange={handleInputChange}
                                             placeholder={'Address'}
                                              label={'Address'}  />
                                        </Col>

                                        <Col md={4} >
                    <SelectField
                      className="wfield"
                      required
                      label="Country"
                      name="country"
                      type="select"
                      title="country Name"
                      options={Countriesoption}
                      value={unitData?.gd_country_id}
                      onChange={handleInputChange}
                    />
                  </Col>

                                        <Col md={4} >
                                        <LabelFieldS                    
                     className="wfield"
                        label="Gender"
                        value={unitData?.gender}
                        name="gender"
                        onChange={handleInputChange}
                        option={[
                          { label: "Male" },
                          { label: "Female" },
                        ]}
                        />
                            </Col>
                            <Col md={4}>
                                            <LabelField type={'description'}
                                             className="wfield"
                                             value={unitData?.description}
                                             name="description"
                                             onChange={handleInputChange}
                                              placeholder={'detail of customer'} 
                                              label={"Description"} />
                                        </Col>
                              
                        {/* <Col md={4}>
                        <LabelFieldS                    
                     className="wfield"
                        label="Group"
                        value={unitData?.city}
                        name="city"
                        onChange={handleInputChange}
                        option={[
                          { label: "Group A", value: null },
                          { label: "Group B", value: null },
                        ]}
                        />
                        </Col> */}
                                        {/* <Col md={6}>
                                            <Box className={'cus-mt-5'}>
                                            <MultiSelectField label={'Gender'}/>
                                            </Box>
                                        </Col>
                                        <Col md={6}>
                                            <LabelTextarea label={'Description'}/>
                                        </Col>
                                        <Col md={6}>
                                        <Box className={'cus-mt-5'}>
                                            <MultiSelectField label={'Group'}/>
                                            </Box>                         */}
                                        {/* </Col> */}
                                    </Row>
                                </Col>
                            </Row>
                        
                    </Col>
                </Row>
            </PageLayout>
        </div>
    );
}
