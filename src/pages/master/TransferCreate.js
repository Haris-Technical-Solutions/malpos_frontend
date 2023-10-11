import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import SelectField from "../../components/fields/SelectField";
import MultiSelectField from "../../components/fields/MultiSelectField";
import CalenderField from "../../components/fields/CalenderField";
import { LabelField } from "../../components/fields";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import CusField from "../../components/fields/CusField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { Box, Button } from "../../components/elements";
import axiosInstance from "../../api/baseUrl";
import { useLocation } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { Form } from "react-bootstrap";
import IconSearchBar from "../../components/elements/IconSearchBar";
import CusLabelField from "../../components/fields/CusLabelField";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export default function TransferCreate() {
  const [open, close] = useState(false);
  const [show, setShow] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [numBoxes, setNumBoxes] = useState(1);
  const [boxId, setBoxId] = useState();
  const handleCloseGoods = () => setShow(false);
  const handleShowGoods = () => setShow(true);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const currentDate = new Date();
  const [currentStorage, setCurrentTransfer] = useState({});
  const [action, setAction] = useState();
  const location = useLocation();
  const [selectedBranchId, setSelectedBranchId] = useState("1");
  const [selectedBrandId, setSelectedBrandId] = useState("1");
  const [selectedClientId, setSelectedClientId] = useState("1");
  const [selectedFromStorage, setSelectedFromStorage] = useState("1");
  const [selectedToStorage, setSelectedToStorage] = useState("3");
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentSupplies, setCurrentSupplies] = useState([]);
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const [clients, setClients] = useState([]);
  const [uoms, setUOMs] = useState([]);
  const [reason, setReason] = useState("");
  const [stocks, setStocks] = useState([]);
  const [supplyLines, setSupplyLines] = useState([
    {
      md_product_id: 0,
      qty: 0,
      md_product_units_id: "base",
    },
  ]);
  const clientsOptions =
    clients != undefined &&
    clients?.map((item) => ({
      label: item.name,
      value: item.cd_client_id,
    }));
  const productOptions =
    products != undefined &&
    products?.map((item) => ({
      label: item.product_name,
      value: item.md_product_id,
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

  const storageOptions =
    storages != undefined &&
    storages?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

  const uomOptions =
    uoms != undefined &&
    uoms?.map((item) => ({
      label: item.name,
      value: item.cd_brand_id,
    }));
  const Closehandle = () => {
    close(false);
  };
  const isValidDate = (current) => {
    return current.isSame(currentDate, "day");
  };
  const handleMultiSelect = () => {
    close(!open);
  };
  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchProducts();
    fetchStorage();
    fetchUom()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching supply data", error);
      });
    // if (location.state?.id) {
    //   fetchStorageById(location.state?.id);
    //   setEditStorageId(location.state?.id);
    //   setAction(location.state?.action);
    // }
  }, [location.state]);
  const fetchUom = async () => {
    try {
      const res = await axiosInstance.get("/uom");
      setUOMs(res.data.data.data);
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
  const fetchStorage = async () => {
    try {
      const res = await axiosInstance.get("/md_storage");
      setStorages(res.data.data);
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

  const fetchStocks = async (storageid) => {
    try {
      const response = await axiosInstance.get("/get_stock");
      const stockData = response.data.data;

      let filteredStock = stockData.filter(
        (stock) => stock.storage_id === storageid
      );
      const stocksWithDetails = await Promise.all(
        filteredStock.map(async (stock) => {
          const mdProductId = stock.md_product_id;
          const mdStorageId = stock.md_storage_id;

          const productResponse = await axiosInstance.get(
            `/product/${mdProductId}/edit`
          );
          const storageResponse = await axiosInstance.get(
            `/md_storage/${mdStorageId}/edit`
          );

          return {
            ...stock,
            productName: productResponse.data.product_name,
            productPrice: productResponse.data.product_price,
            storageName: storageResponse.data.name,
          };
        })
      );
      setStocks(stocksWithDetails);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddBox = () => {
    const newSupplyLine = {
      md_product_id: 0,
      qty: 0,
      md_product_units_id: "base",
    };
    const updatedSupplyLines = [...supplyLines];
    updatedSupplyLines.push(newSupplyLine);
    setSupplyLines(updatedSupplyLines);
  };

  const handleRemoveBox = (id) => {
    setBoxes(boxes.filter((box) => box.key !== id));
    setNumBoxes(numBoxes - 1);
  };

  const handleCreateTransfers = () => {
    let timeCurrent = selectedDateTime.format("YYYY-MM-DD HH:mm:ss");
    delete supplyLines.unitsOptions;
    const updatedSupplyLines = supplyLines.map((line) => ({
      ...line,
      md_product_units_id: line.uom_id,
      uom_id: undefined,
    }));
    let currentTransefers_ = {
      cd_client_id: selectedClientId,
      cd_brand_id: selectedBrandId,
      cd_branch_id: selectedBranchId,
      operation_time: timeCurrent,
      md_from_storage_id: selectedFromStorage,
      md_to_storage_id: selectedToStorage,
      created_by: "1",
      updated_by: "1",
      lines: updatedSupplyLines,
    };
    debugger;
    // console.log(currentSupplies_,'currentSupplies_');
    // return
    axiosInstance
      .post(`/md_stock_transfer`, currentTransefers_)
      .then((response) => {
        toast.success("Transfer updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        console.log("Transfer updated successfully", response.data);
      })
      .catch((error) => {
        toast.error("Error updating Transfer", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error updating Transfer", error);
      });
  };
  const handleUpdateTransfers = (editSuppliesId) => {
    let timeCurrent = selectedDateTime.format("YYYY-MM-DD HH:mm:ss");
    delete supplyLines.unitsOptions;
    const updatedSupplyLines = supplyLines.map((line) => ({
      ...line,
      md_product_units_id: line.uom_id,
      uom_id: undefined,
    }));
    let currentSupplies_ = {
      cd_client_id: selectedClientId,
      cd_brand_id: selectedBrandId,
      operation_time: timeCurrent,
      cd_branch_id: selectedBranchId,
      md_from_storage_id: selectedFromStorage,
      md_to_storage_id: selectedToStorage,
      created_by: "1",
      updated_by: "1",
      lines: updatedSupplyLines,
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

  const handleDateChange = (date) => {
    setSelectedDateTime(date);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    if (action == "updateTrasnsfer") {
      handleUpdateTransfers(location.state.id);
    } else {
      handleCreateTransfers();
    }
  };
  const fetchUomById = async (id) => {
    try {
      const res = await axiosInstance.get(`/uom/${id}/edit`);
      console.log(res.data, "response here is upom");
      setUOMs([res.data.data]);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSupplyFieldsChange = (event, index, fieldName) => {
    debugger;
    // debugger
    const { value } = event.target;

    if (fieldName == "md_product_id") {
      let pro = products.filter((p) => p.md_product_id == value);
      console.log(pro, "pro is here");

      fetchUomById(pro[0].base_unit.md_uom_id);
    }
    // Clone the supplyLines array
    const updatedSupplyLines = [...supplyLines];
    // Update the field
    updatedSupplyLines[index][fieldName] = value;
    // Calculate and update the total
    // updatedSupplyLines[index].total = calculateTotal(updatedSupplyLines[index]);

    // Update the state
    setSupplyLines(updatedSupplyLines);
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <CardLayout>
              <Row>
                <Col md={12}>
                  <div className="d-flex justify-content">
                    <h3>
                      {action === "updateTransfers"
                        ? "Update Transfers"
                        : "Create Transfers"}
                    </h3>
                    <div
                      className="align-self-end"
                      style={{ paddingLeft: "62%" }}
                    >
                      <button
                        className="add-product-btn-pl"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Submit
                      </button>
                    </div>
                    <Link to={"/transfers"} className="btnback">
                      {" "}
                      <button className="btnlk"> Back</button>
                    </Link>
                  </div>
                </Col>
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      <SelectField
                        // className="w-50"
                        label="Client"
                        name="cd_client_id"
                        className="wfield"
                        options={clientsOptions}
                        value={selectedClientId}
                        onChange={(e) => setSelectedClientId(e.target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <SelectField
                        required
                        label="Brand"
                        name="brand"
                        type="select"
                        title="Brand"
                        className="wfield"
                        options={brandsOptions}
                        value={selectedBrandId}
                        onChange={(e) => setSelectedBrandId(e.target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <SelectField
                        required
                        className="wfield"
                        label="Branch"
                        name="branch"
                        type="select"
                        title="Branch"
                        options={branchesOptions}
                        value={selectedBranchId}
                        onChange={(e) => setSelectedBranchId(e.target.value)}
                      />
                    </Col>
                    <Col md={6} className="cus-col-mt">
                      <SelectField
                        required
                        className="wfield"
                        label="From Storage"
                        name="from_storage"
                        type="select"
                        title="From Storage"
                        options={storageOptions}
                        value={selectedFromStorage}
                        onChange={(e) =>
                          setSelectedFromStorage(
                            e.target.value,
                            fetchStocks(e.target.value)
                          )
                        }
                      />
                    </Col>
                    <Col md={6} className="cus-col-mt">
                      <SelectField
                        required
                        className="wfield"
                        label="To Storage"
                        name="to_storage"
                        type="select"
                        title="To Storage"
                        options={storageOptions}
                        value={selectedToStorage}
                        onChange={(e) => setSelectedToStorage(e.target.value)}
                      />
                    </Col>
                    <Col md={6} className="cus-col-mt">
                      <Row>
                        <Col md={6}>
                          <Form.Label>OPERATION TIME</Form.Label>
                          <Datetime
                            className="mfield"
                            style={{ width: "100% !important" }}
                            value={selectedDateTime}
                            onChange={handleDateChange}
                            dateFormat="YYYY-MM-DD"
                            isValidDate={isValidDate}
                            timeFormat="HH:mm"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6} className="cus-col-mt">
                      <LabelField
                        className="wfield"
                        type={"text"}
                        label={"Reason"}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Box className={"product-add-box"}>
                    <Box className={"product "}> Product</Box>
                    <Box className={"Unit"}> Unit</Box>
                    <Box className={"Qty"}> Qty</Box>
                    <Box className={"Xmark"}> </Box>
                  </Box>

                  {supplyLines.map((supply, index) => {
                    return (
                      <Box className="manage-modifier-gen-box">
                        <Box className="manage-modifier-gen-box-inner-textfield">
                          <Box className=" modifier-gen-box-items modifier-gen-box-mod">
                            <Form.Group>
                              <Form.Control
                                className="lfield"
                                as="select"
                                name="productid"
                                type="select"
                                value={supply.md_product_id} // Set the value to preselect
                                onChange={(e) => {
                                  handleSupplyFieldsChange(
                                    e,
                                    index,
                                    "md_product_id"
                                  );
                                }}
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
                                className="lfield"
                                name="uom_id"
                                type="select"
                                value={supply.uom_id} // Set the value to preselect
                                onChange={(e) =>
                                  handleSupplyFieldsChange(e, index, "uom_id")
                                }
                              >
                                <option value="">Select</option>
                                {uomOptions &&
                                  uomOptions.length > 0 &&
                                  uomOptions.map((option) => (
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

                          <Box className="modifier-gen-box-items modifier-gen-box-gross">
                            <LabelField
                              className="lfield"
                              value={supply.qty}
                              onChange={(e) => {
                                handleSupplyFieldsChange(e, index, "qty");
                              }}
                              type="text"
                              fieldSize="w-100 h-md"
                              placeholder="0"
                            />
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Col>
                <Col md={12}>
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
                        <button
                          style={{ color: "balck" }}
                          onClick={() => handleRemoveBox(index)}
                        >
                          ✖
                        </button>
                      </div>
                    );
                  })}
                </Col>
                <Col md={12}>
                  <Box className={"tc-multiSel-btns"}>
                    <Button
                      onClick={handleMultiSelect}
                      className={" tc-multiSel-btn cus-icon-btn"}
                    >
                      <FontAwesomeIcon icon={faBars} /> Multi Select
                      {open ? (
                        <Box className={"tc-multiSel-Select-item-box"}>
                          <Box className={"tc-multiSel-Select-item-inner"}>
                            <Box
                              className={"tc-multiSel-Select-item-textfield"}
                            >
                              <IconSearchBar />
                            </Box>
                            <Box className={"tc-multiSel-Select-item-btns"}>
                              <Box>
                                <Button
                                  onClick={handleShowGoods}
                                  className={"tc-select-btn-outline"}
                                >
                                  Create Ingredients
                                </Button>
                                <Modal
                                  show={show}
                                  className={"goods-cre-model-wrapper"}
                                  onHide={handleCloseGoods}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Create Ingredient</Modal.Title>
                                  </Modal.Header>
                                  <Box className={"cre-goods-body-wrap"}>
                                    <Modal.Body>
                                      <Row>
                                        <Col md={12}>
                                          <CusField
                                            type={"text"}
                                            placeholder="Name"
                                          />
                                        </Col>
                                        <Col md={12}>
                                          <LabelField
                                            option={[
                                              "Select Category",
                                              "R TIS",
                                              "T TIS",
                                              "Tax Materials",
                                            ]}
                                            fieldSize="w-100 h-md"
                                          />
                                        </Col>
                                        <Col md={12}>
                                          <LabelField
                                            option={[
                                              "Select Unit",
                                              "Piece",
                                              "liter",
                                              "meter",
                                            ]}
                                            fieldSize="w-100 h-md"
                                          />
                                        </Col>
                                      </Row>
                                    </Modal.Body>
                                  </Box>
                                  <Modal.Footer className="model-footer">
                                    <Button
                                      className={"model-f-btn"}
                                      onClick={handleCloseGoods}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      className={" model-f-btn "}
                                      onClick={handleCloseGoods}
                                    >
                                      Cancel
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Box>
                              <Box>
                                <Button className={"tc-select-btn"}>
                                  Select All
                                </Button>
                                <Button
                                  onClick={Closehandle}
                                  className={"tc-select-btn"}
                                >
                                  Save
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Button>

                    <Button
                      className={"  cus-icon-btn-sc"}
                      onClick={() => handleAddBox(uuidv4)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      Add{" "}
                    </Button>
                  </Box>
                </Col>
              </Row>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
