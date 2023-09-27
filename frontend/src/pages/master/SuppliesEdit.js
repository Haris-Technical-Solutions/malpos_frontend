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
  const [currentSupplies, setCurrentSupplies] = useState({
    id: "",
    md_supply_id: "",
    invoice_no: "",
    md_product_id: "",
    balance: "",
    qty: 0,
    operation_time: "",
    storage: "",
    unit: "",
    cost: 0,
    discount_percent: 0,
    tax_percent: 0,
    total: 0,
    created_at: "",
    updated_at: "",
    cd_branch_id: form.cd_branch_id, // Use context value
    cd_brand_id: form.cd_brand_id, // Use context value
    cd_client_id: form.cd_client_id, // Use context value
  });
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [invoiceNumber, setInvoicesNumber] = useState("asdf");
  const [description, setDescription] = useState("asdf");
  const [seleectedProduct ,setSelectedProduct]  = useState([]);
  const storageOptions =
    storage != undefined &&
    storage?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

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

  const productOptions =
    products != undefined &&
    products?.map((item) => ({
      label: item.product_name,
      value: item.id,
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
  const handleAddBox = () => {
    const nextIndex = boxes.length;
    const newBox = (
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
        <Box className="manage-modifier-gen-box">
          <Box className="manage-modifier-gen-box-inner-textfield">
            <Box className=" modifier-gen-box-items modifier-gen-box-mod">
              <LabelField
                option={[
                  "Select",
                  "Sea food",
                  "Expresso",
                  "Ice drink",
                  "Pizza",
                ]}
                // option={option}
                fieldSize="w-100 h-md"
                // onChange={handleOptionChange}
              />
            </Box>
            <Box className=" modifier-gen-box-items modifier-gen-box-mod">
              <LabelField
                option={[
                  "Select",
                  "Sea food",
                  "Expresso",
                  "Ice drink",
                  "Pizza",
                ]}
                // option={option}
                fieldSize="w-100 h-md"
                // onChange={handleOptionChange}
              />
            </Box>

            <Box className="modifier-gen-box-items modifier-gen-box-gross">
              <LabelField type="text" fieldSize="w-100 h-md" placeholder="0" />
            </Box>
            <Box className="modifier-gen-box-items modifier-gen-box-gross">
              <LabelField type="text" fieldSize="w-100 h-md" placeholder="0" />
            </Box>

            <Box className="modifier-gen-box-items modifier-gen-box-gross">
              <LabelField type="text" fieldSize="w-100 h-md" placeholder="0" />
            </Box>

            <Box className="modifier-gen-box-items modifier-gen-box-gross">
              <LabelField type="text" fieldSize="w-100 h-md" placeholder="0" />
            </Box>
            <Box className="modifier-gen-box-items modifier-gen-box-price">
              <LabelField type="text" fieldSize="w-100 h-md" placeholder="0" />
            </Box>
          </Box>
        </Box>
      </Col>
    );
    setBoxes([...boxes, newBox]);
    setNumBoxes(numBoxes + 1);
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/product_category");
      setCategories(res.data.product_category);
      console.log("product_category", res.data.product_category);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSupplies = () => {
    axiosInstance
      .post(`/md_supplies/update/${editSuppliesId}`, currentSupplies)
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
  setSelectedProduct(e.target.value)

}
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <div className="d-flex justify-content-between">
                <h3>
                  {action === "updateProduct"
                    ? "Update Supplies"
                    : "Create Supplies"}
                </h3>
                <div className="align-self-end">
                  <button
                    className="add-product-btn-pl"
                    // onClick={(e) => handleSubmit(e)}
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
                  {/* <MultiSelect
                      options={storageOptions}
                      value={selectedStorage}
                      onChange={handleStorageChange}
                      labelledBy="Select"
                      hasSelectAll={false}
                    /> */}
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
                {/* <Col md={12}>
                  <button className="cus-btn">
                    {" "}
                    {action === "updateSupplies" ? "Update" : "Create"}
                  </button>
                  <Link to="/product-list">
                    <button
                      style={{
                        backgroundColor: "#F07632",
                        color: "white",
                        borderColor: "#F07632",
                      }}
                      className="cus-btn-bor"
                    >
                      Back
                    </button>
                  </Link>
                </Col> */}
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
                  <Box className="manage-modifier-gen-box">
                    <Box className="manage-modifier-gen-box-inner-textfield">
                      <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                        <Form.Group>
                          <Form.Control
                            as="select"
                            name="status"
                            type="select"
                            value={selectedStorage} // Set the value to preselect
                            onChange={handleProductSelect}
                          >
                            <option value="">Select</option>
                            {productOptions.map((option) => (
                              <option key={option.value} value={option.value}>
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
                            name="status"
                            type="select"
                            value={selectedStorage} // Set the value to preselect
                            onChange={handleStorageChange}
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
                          type="text"
                          fieldSize="w-100 h-md"
                          placeholder="0"
                        />
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-gross">
                        <LabelField
                          type="text"
                          fieldSize="w-100 h-md"
                          placeholder="0"
                        />
                      </Box>

                      <Box className="modifier-gen-box-items modifier-gen-box-gross">
                        <LabelField
                          type="text"
                          fieldSize="w-100 h-md"
                          placeholder="0"
                        />
                      </Box>

                      <Box className="modifier-gen-box-items modifier-gen-box-gross">
                        <LabelField
                          type="text"
                          fieldSize="w-100 h-md"
                          placeholder="0"
                        />
                      </Box>
                      <Box className="modifier-gen-box-items modifier-gen-box-price">
                        <LabelField
                          type="text"
                          fieldSize="w-100 h-md"
                          placeholder="0"
                        />
                      </Box>
                    </Box>
                  </Box>
                  {boxes.map((box, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          // marginTop: "25px",
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
