import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import PageLayout from "../../layouts/PageLayout";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { useProduct } from "../../components/createProduct/productContext"; // Import the context
import { MultiSelect } from "react-multi-select-component";
export default function SuppliesEdit() {
  const location = useLocation();
  const { form } = useProduct(); // Retrieve the context
  const [storage, setStorage] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [numBoxes, setNumBoxes] = useState(1);
  const [editSuppliesId, setEditSuppliesId] = useState(null);
  const [action, setAction] = useState("asdf");
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [products, setProducts] = useState([]);
  const statusOptions = [
    { label: "Approved", value: "approved" },
    { label: "Draft", value: "draft" },
    { label: "Deleted", value: "deleted" },
  ];
  const [uoms, setUOMs] = useState([]);
  const [currentSupplies, setCurrentSupplies] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [invoiceNumber, setInvoicesNumber] = useState("asdf");
  const [description, setDescription] = useState("asdf");
  const [seleectedProduct, setSelectedProduct] = useState([]);
  const storageOptions =
    storage != undefined &&
    storage?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  const [supplyLines, setSupplyLines] = useState([
    {
      md_product_id: 0,
      qty: 0,
      total: 0,
      cost: 0,
      discount_percent: 0,
      tax: 0,
      uom_id: 0,
      uom_type: "base",
    },
  ]);
  useEffect(() => {
    fetchProducts();
    fetchUom();
    fetchStorage();
    fetchCategories();
    if (location.state?.id) {
      setEditSuppliesId(location.state.id);
      setAction(location.state.action);

      const fetchSuppliesById = async (id) => {
        try {
          const res = await axiosInstance.get(`/md_supplies/${id}/edit`);
          setCurrentSupplies(res.data);
          setSelectedStorage(res.data.md_storage_id);
          fecthSupplyLines(res.data?.supplies_lines);
          setSelectedStatus(res.data.status.toLowerCase());
          setInvoicesNumber(res.data.invoice_no);

          const momentObject = moment(
            res.data.operation_time,
            "YYYY-MM-DD HH:mm:ss"
          );
          const formattedDate = momentObject.format("YYYY-MM-DD HH:mm");
          setSelectedDateTime(formattedDate);
          console.log(res.data, "supplies updated");
        } catch (error) {
          console.log(error);
        }
      };
      fetchSuppliesById(location.state.id);
    }
  }, [location.state]);
  
  const fecthSupplyLines = (supplies) => {
    debugger

    const suppliesOptions = supplies.map((item) => ({
      md_product_id: item.md_product_id,
      qty: item.qty,
      total: item.total,
      cost: item.cost,
      discount_percent: item.discount_percent,
      tax: item.tax,
      uom_id: item.uom_id,
      uom_type: "base",
    }));

    setSupplyLines(suppliesOptions);
  };
  const productOptions =
    products != undefined &&
    products?.map((item) => ({
      label: item.product_name,
      value: item.md_product_id,
    }));
  const CategoryOptions =
    categories != undefined &&
    categories?.map((item) => ({
      label: item.product_category_name,
      value: item.md_product_category_id,
    }));

  const handleSwitchChange = () => {
    setCurrentSupplies((prevSupplier) => ({
      ...prevSupplier,
      is_active: prevSupplier.is_active === "1" ? "0" : "1",
    }));
  };

  const fetchStorage = async () => {
    try {
      const res = await axiosInstance.get("/md_storage");
      setStorage(res.data.data);
      console.log("Storage", res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/product");
      setProducts(res.data.products.data);
      console.log("setProducts", res.data.products.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUom = async () => {
    try {
      const res = await axiosInstance.get("/uom");
      setUOMs(res.data.data.data);
      console.log("uom details", res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleRemoveBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
    setNumBoxes(numBoxes - 1);
  };
  const handleAddBox = () =>{

    const newSupplyLine = {
      md_product_id: '', 
      qty: 0,
      cost: 0,
      discount_percent: 0,
      tax: 0,
      total: 0,
      uom_id: '',
      uom_type: 'base',
    };
    const updatedSupplyLines = [...supplyLines];
    updatedSupplyLines.push(newSupplyLine);
    setSupplyLines(updatedSupplyLines);
  }


  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/product_category");
      setCategories(res.data.product_category);
      console.log("product_category", res.data.product_category);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSupplies = (editSuppliesId) => {
    let currentSupplies_ = {
      cd_client_id: currentSupplies.cd_client_id,
      cd_brand_id: currentSupplies.cd_brand_id,
      cd_branch_id: currentSupplies.cd_branch_id,

      invoice_no: invoiceNumber,
      operation_time: selectedDateTime,
      md_supplier_id: currentSupplies.md_supplier_id,
      md_storage_id: selectedStorage,
      status: selectedStatus,
      balance: null,
      category: null,
      description: description,
      created_by: "1",
      updated_by: "1",
      lines: supplyLines,
    };
    // console.log(currentSupplies_,'currentSupplies_');
    // return
    axiosInstance
      .post(`/md_supplies/update/${editSuppliesId}`, currentSupplies_)
      .then((response) => {
        toast.success("Supplies updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Supplies updated successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error updating supplies", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error updating supplies", error);
      });
  };

  const handleStorageChange = (e) => {
    setSelectedStorage(e.target.value);
    // setSelectedStorage(selectedOptions);
    // const selectedIds = selectedOptions.map((option) => option.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action == "updateSupplies") {
      handleUpdateSupplies(location.state.id);
    } else {
      console.log("we are here");
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
  };
  const handleDateChange = (date) => {
    console.log("date", date);
    setSelectedDateTime(date);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handleProductSelect = (e) => {
    console.log(e.target.value);
    setSelectedProduct(e.target.value);
  };

function handleSupplyFieldsChange(event, index, fieldName) {
  const { name, value } = event.target;
  const updatedSupplyLines = [...supplyLines];
  updatedSupplyLines[index][fieldName] = value;
  setSupplyLines(updatedSupplyLines);
}
  
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between">
                <h3>
                  {action === "updateSupplies"
                    ? "Update Supplies"
                    : "Create Supplies"}
                </h3>
                <div className="align-self-end">
                  <button
                    className="add-product-btn-pl"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </CardLayout>
          </Col>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={4}>
                  <LabelField
                    label="Supplier Name"
                    type="text"
                    value={currentSupplies?.supplier?.supplier_name}
                    onChange={(e) =>
                      setCurrentSupplies({
                        ...currentSupplies,
                        supplier_name: e.target.value,
                      })
                    }
                    placeholder={"Supplier Name"}
                  />
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Storage</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      type="select"
                      value={selectedStorage} // Set the value to preselect
                      onChange={handleStorageChange}
                    >
                      <option value="">Select</option>
                      {storageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Box className="multi-select-opt">
                    <label>
                      Category
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MultiSelect
                      options={[]}
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      labelledBy="Select"
                      hasSelectAll={false}
                    />
                  </Box>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      type="select"
                      value={selectedStatus} // Set the value to preselect
                      onChange={handleStatusChange}
                    >
                      <option value="">Select</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Label>OPERATION TIME</Form.Label>
                  <Datetime
                    value={selectedDateTime}
                    onChange={handleDateChange}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Invoice Number"
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoicesNumber(e.target.value)}
                    placeholder={"Invoice Number"}
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={"Description"}
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Balance"
                    type="text"
                    value={currentSupplies && currentSupplies?.balance}
                    placeholder={"Balance"}
                  />
                </Col>

                <Col md={12}>
                  <Box className="manage-modifier-gen-box">
                    <Box className="manage-modifier-gen-box-inner">
                      <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                        Product
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-name">
                        Unit
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-img">
                        QTY
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-gross">
                        Cost
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-def">
                        Discount(%)
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-cp">
                        Tax(%)
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-price">
                        Total
                      </Box>
                    </Box>
                  </Box>

                  {supplyLines.map((supply, index) => {
                    return (
                      <Box className="manage-modifier-gen-box">
                        <Box className="manage-modifier-gen-box-inner-textfield">
                          <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="productid"
                                type="select"
                                value={supply.md_product_id} // Set the value to preselect
                                onChange={(e)=>{handleSupplyFieldsChange(e, index, 'md_product_id')}}
                              >
                                <option value="">Select</option>
                                {productOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          </Box>
                          <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                            <Form.Group>
                              <Form.Control
                                as="select"
                                name="uom_id"
                                type="select"
                                value={supply.uom_id} // Set the value to preselect
                                onChange={(e)=>{handleSupplyFieldsChange(e, index, 'uom_id')}}
                              >
                                <option value="">Select</option>
                                {uoms.map((option) => (
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

                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              value={supply.qty}
                              onChange={(e)=>{handleSupplyFieldsChange(e, index, 'qty')}}
                              type="text"
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>
                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              type="text"
                              value={supply.cost}
                              onChange={(e)=>{handleSupplyFieldsChange(e, index, 'cost')}}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>

                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              type="text"
                              value={supply.discount_percent}
                              onChange={(e)=>{handleSupplyFieldsChange(e, index, 'discount_percent')}}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>

                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              type="text"
                              value={supply.tax}
                              onChange={(e)=>{handleSupplyFieldsChange(e, index, 'tax')}}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>
                          <Box className="modifier-gen-box-items modifier-gen-box-price">
                            <LabelField
                              type="text"
                              value={supply.total}
                              onChange={(e)=>{handleSupplyFieldsChange(e, index, 'total')}}
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                  {boxes.map((box, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {console.log(index)}
                        <div
                          style={{
                            display: "flex",
                            flexGrow: 1,
                            marginRight: "10px",
                          }}
                        >
                          {box}
                        </div>
                        <button onClick={() => handleRemoveBox(index)}>
                          ✖
                        </button>
                      </div>
                    );
                  })}
                  <button
                    className="mange-mod-tab-add-btn"
                    onClick={handleAddBox}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
