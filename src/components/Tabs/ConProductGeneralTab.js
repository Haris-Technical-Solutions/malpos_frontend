import React,{useState,useEffect} from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import { LabelField } from "../fields";
import { useProduct } from "../createProduct/productContext";
import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import { Box } from "../elements";
import ColorDivs from "./ColorDivs";
import { FormLabel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";

export default function ConProductGeneralTab() {
 
  const location=useLocation();
  const [action, setAction] = useState();
  const {
    clients,
    brands,
    branches,
    categories,
    taxCategories,
    diets,
    allergies,
    stations,
    menus,
    menuId,
    UOMs,
    // menuSections,
    imagePreviewURL,
    setDeletingMethod,
    deletingMethod,
    editProductId,
    form,
    setForm,
    setClients,
    setBrands,
    setBranches,
    setCategories,
    setTaxCategories,
    setDiets,
    setAllergies,
    setStations,

    setMenus,
    // setMenuId,
    // setMenuSections,
    setImagePreviewURL,
    setEditProductId,

    handleClientChange,
    handleBrandChange,
    handleBranchChange,
    handleCategoryChange,
    handleDietsChange,
    handleAllergyChange,
    // handleMenuChange,
    handleMenuSectionChange,
    handleStationChange,

    handleChange,
    handleTaxCategoryChange,
    handleUomChange,
    handleCheckboxChange,
    handleSubmit,
  } = useProduct();
 
  const [show, setShow] = useState(false);
  const [imgfile, setImgFile] = useState([]);
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.state?.id) {
      setEditProductId(location.state?.id);
      setAction(location.state?.action);
      fetchProductData();
    } else {
      setImagePreviewURL("");
      setEditProductId(null);
      setForm({
        cd_client_id: "",
        cd_brand_id: "",
        cd_branch_id: "",
        td_tax_category_id: null,
        is_active: 1,
        product_name: "",
        maximun_day_of_product_return: "",
        gift: false,
        portion: false,
        ignore_service_charges:false,
        not_allow_apply_discount: "",
        sold_by_weight: false,
        sale_price: "",
        barcode: "",
        product_image: null,
        product_price: "",
        created_by: "1",
        updated_by: "1",
        product_detail: [],
      });
    }
  }, []);
  const getPreSelectIds = (productData, field) => {
    // console.log(productData, field);
    const categoryIds = productData.map((item) => item[field]);
    console.log("ids here ->>" + categoryIds, field);
    return categoryIds;
  };

  const showDetails = () => {
    setShow(!show);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImgFile([...imgfile, reader.result]);
    };

    reader.readAsDataURL(file);
  };
  const handleImageRemove = (index) => {
    const newImgFile = [...imgfile];
    newImgFile.splice(index, 1);
    setImgFile(newImgFile);
  };

  const fetchProductData = async () => {
    if (location.state?.id) {
      const id = location.state?.id;
      try {
        const response = await axiosInstance.get(`/product_edit/${id}`);
        console.log(response, "response is here");
        const productData = response.data;
        setImagePreviewURL(productData.product_image);
        setForm((prevForm) => ({
          ...prevForm,
          cd_client_id: productData.cd_client_id,
          cd_brand_id: getPreSelectIds(
            productData.product_brand,
            "cd_brand_id"
          ),
          cd_branch_id: getPreSelectIds(
            productData.product_branch,
            "cd_branch_id"
          ),
          md_product_category_id: getPreSelectIds(
            productData.product_product_category,
            "md_product_category_id"
          ),
          product_name: productData.product_name,
          maximun_day_of_product_return:
            productData.maximun_day_of_product_return,
          sale_price: productData.sale_price,
          is_active: productData.is_active,
          description: productData.description,
          gift: productData.gift,
          ignore_service_charges:productData.ignore_service_charges,
          portion:productData.portion,
          barcode: productData.barcode,
          not_allow_apply_discount: productData.not_allow_apply_discount,
          md_station_id: 
          // getPreSelectIds(
            productData.md_station_id,
          //   "md_station_id"
          // ),
          product_price: productData.product_price,
          product_image: productData.product_image,
          }));
      } catch (error) {}
    }
  };
  // const handleChange1 = (e) => {
  //   const inputValue = e.target.value;
  //   if (inputValue > 1) {
  //     setErrorMessage(" Cannot be greater than 1");
  //   } else {
  //     setErrorMessage("");

  //     setValue(inputValue);
  //   }
  // };
  return (
    <div>
      <Row>
        <Col md={12}>
          <form onSubmit={handleSubmit} >

          <Row>
          <Col md={4}  >
                          <SelectField
                            className="wfield"
                            label="Client"
                            name="cd_client_id"
                            options={clients}
                            value={form.cd_client_id}
                            onChange={handleClientChange}
                          />
                        </Col>
                        <Col md={4}>
                          <MultiSelectField
                            required
                            label="Role"
                            className="wfield"
                            name="cd_brand_id"
                            type="select"
                            title="Brand"
                            options={brands}
                            value={form.cd_brand_id}
                            onChange={handleBrandChange}
                          />
                        </Col>
                        <Col md={4}   >
                          <MultiSelectField
                            required
                            className="wfield"
                            label="Role"
                            name="cd_branch_id"
                            type="select"
                            title="Branch"
                            options={branches}
                            value={form.cd_branch_id}
                            onChange={handleBranchChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                            required
                            className="wfield"
                            label="Name"
                            name="product_name"
                            type="text"
                            value={form.product_name}
                            placeholder="Enter product name"
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                           className="wfield"
                            label="Barcode"
                            type="text"
                            name="barcode"
                            placeholder="Enter barcode"
                            value={form.barcode}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <MultiSelectField
                            required
                            label="Category"
                            className="wfield"
                            name="md_product_category_id"
                            type="select"
                            title="Category"
                            options={categories}
                            value={form.md_product_category_id}
                            onChange={handleCategoryChange}
                          />
                        </Col>
                        <Col md={4}>
                          <SelectField
                           className="wfield"
                            label="Tax Category"
                            name="td_tax_category_id"
                            options={taxCategories}
                            value={form.td_tax_category_id}
                            onChange={handleTaxCategoryChange}
                          />
                        </Col>
                        <Col md={4}>
                          <SelectField
                            label="Station"
                            className="wfield"
                            name="md_station_id"
                            options={stations}
                            value={form.md_station_id}
                            onChange={handleStationChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                           className="wfield"
                            label="Maxium day of product return"
                            type="number"
                            name="maximun_day_of_product_return"
                            placeholder="Number of days to return"
                            value={form.maximun_day_of_product_return}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={12}>
                          <Box className="basicInfo-checkBoxes">
                            <Form.Check
                              type="checkbox"
                              label="Inactive"
                              name="is_active"
                              value={form.is_active}
                              checked={form.is_active === 1}
                              onChange={handleCheckboxChange}
                            />

                            <Form.Check
                              type="checkbox"
                              label="Gifts"
                              name="gift"
                              value={form.gift}
                              checked={form.gift === 1}
                              onChange={handleCheckboxChange}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Can't be Discounted"
                              name="not_allow_apply_discount"
                              value={form.not_allow_apply_discount}
                              checked={form.not_allow_apply_discount === 1}
                              onChange={handleCheckboxChange}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Ignore Service Charges"
                              name="ignore_service_charges"
                              value={form.ignore_service_charges}
                              checked={form.ignore_service_charges === 1}
                              onChange={handleCheckboxChange}
                            />
                            {/* <Form.Check
                              type="checkbox"
                              label="Bundle"
                              name="bundle"
                              value={form.bundle}
                              checked={form.bundle === 1}
                              onChange={handleCheckboxChange}
                            /> */}

                            <Form.Check
                              type="checkbox"
                              label="Sold by Weight"
                              name="sold_by_weight"
                              value={form.sold_by_weight}
                              checked={form.sold_by_weight === 1}
                              onChange={handleCheckboxChange}
                            />
                            <Form.Check
                              type="checkbox"
                              label="Portion"
                              name="portion"
                              value={form.portion}
                              checked={form.portion === 1}
                              onChange={handleCheckboxChange}
                            />
                          </Box>
                        </Col>
            {/* <Col md={4}>
              <LabelField
                type="number"
                className="wfield"
                placeholder="Default: 1"
                label="Maxium day of product return"
                // fieldSize="w-100 h-md"
                onChange={handleChange}
              />
              {errorMessage && (
                <p className="error" style={{ color: "red", fontSize: "10px" }}>
                  {errorMessage}
                </p>
              )}
            </Col> */}
            {/* <Col md={6}>
              <FormLabel>Inactive</FormLabel>
              <Form.Check type="switch" id="custom-switch" label="" />
              <Box className="basicInfo-checkBoxes">
                <Form.Check type="checkbox" label="Ignor Stock" />
                <Form.Check type="checkbox" label="Gifts" />
                <Form.Check type="checkbox" label="Portion" />
                <Form.Check type="checkbox" label="Can't be Discounted" />
                <Form.Check type="checkbox" label="Sold by Weight" disabled />
              </Box>
            </Col> */}
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="formFile">
                      <Form.Label>Image</Form.Label>
                      <Box className="pl-img">
                        {imgfile.length === 0 ? (
                          <>
                            <input
                              type="file"
                              id="fileInput"
                              accept=".jpg, .jpeg, .png"
                              onChange={handleImageUpload}
                            />
                          </>
                        ) : (
                          <>
                            {imgfile.map((elem, index) => (
                              <span key={elem} style={{ display: "block" }}>
                                <button
                                  onClick={() => handleImageRemove(index)}
                                  style={{
                                    float: "right",
                                    marginBottom: "10px",
                                  }}
                                  >
                                  ✖
                                </button>
                                <img
                                  src={elem}
                                  height="200"
                                  width="200"
                                  alt="med1"
                                  style={{ float: "left", marginRight: "10px" }}
                                />
                              </span>
                            ))}
                          </>
                        )}
                      </Box>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={6}>
                  <ColorDivs />
                </Col>
                <Col md={12}>
                  <FormLabel>According to Venue</FormLabel>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                    onClick={showDetails}
                  />
                </Col>
                {show ? (
                  <div>
                    <Col md={12}>
                      <Table>
                        <thead className="thead-recipe">
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="">Inactive</th>
                            <th className=""> Hide on e-menu</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Main</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input "
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td>B2</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                          <tr>
                            <td>Bakery</td>
                            <td>
                              <Col md={2}>
                                <input
                                  className="conProduct-input"
                                  type="number"
                                  placeholder="0"
                                />
                              </Col>
                            </td>
                            <td className="">
                              <Form.Check type="checkbox" />
                            </td>
                            <td className="">
                              {" "}
                              <Form.Check type="checkbox" />
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </div>
                ) : (
                  ""
                )}

                <Col md={12}>
                  <Row>
                  <Col md={4}>
                          <LabelField
                           className="wfield"
                            label="Cost "
                            type="number"
                            name="product_price"
                            placeholder="Enter product cost"
                            value={form.product_price}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={4}>
                          <LabelField
                           className="wfield"
                            label="Price"
                            type="number"
                            name="sale_price"
                            placeholder="Enter Sale Price"
                            value={form.sale_price}
                            onChange={handleChange}
                            />
                        </Col>
                    {/* <Col md={4}>
                      <LabelField
                        type="number"
                        placeholder="0"
                        className="wfield"
                        label="Cost Price"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                    <LabelField
                        type="number"
                        className="wfield"
                        placeholder="0"
                        label="Price"
                        // fieldSize="w-100 h-md"
                      />
                    </Col> */}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
                        </form>
        </Col>
      </Row>
    </div>
  );
}
