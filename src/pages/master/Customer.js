import React, { useState, useEffect } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Breadcrumb } from "../../components";
import axiosInstance from "../../api/baseUrl";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEdit,
  faTrash,
  faAngleDown,
  faPlus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CustomModal from "./Modal";
import CustomPagination from "../../components/CustomPagination";
import SkeletonCell from "../../components/Skeleton";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { useNavigate } from "react-router-dom";

export default function Customer() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const navigate = useNavigate();
  const [state, setState] = useState({
    showOption: false,
    productOpen: false,
    storageOpen: false,
    accountOpen: false,
    typeOpen: false,
    categoryOpen: false,
  });
  const handleStateChange = (key) => {
    setState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((k) => {
        newState[k] = k === key ? !prevState[k] : false;
      });
      return newState;
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchCustomer();
  };

  useEffect(() => {
    fetchCustomer();
    // fetchCustomerGroupNameById();
    console.log("data customers"+customers)
  }, [searchTerm, currentPage]);

  const handleStorageEdit = (id) => {
    console.log("id: " + id);
    navigate(`/Customer-edit`, {
      state: {
        id: id,
        action: "updateCustomer",
      },
    });
  };

  const fetchCustomer = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/md_customer", {
        params: {
          search: searchTerm,
          page: currentPage,
      
        },
      });
      // const updatedCustomers = await Promise.all(
      //   response.data.map(async (customer) => {
      //     const groupName = await fetchCustomerGroupNameById(
      //       customer.group_name
      //     );
      //     const updatedCustomer = {
      //       ...customer,
      //       group_name: groupName || "N/A",
      //     };
      //     setCustomers((prevCustomers) => [response.data, ...prevCustomers]);
      //     console.log("Updated Customer:", updatedCustomer);
      //     return updatedCustomer;
      //   })
      // );

      setCustomers(response.data);
      console.log("My Response"+ response.data);
      // const totalItems= response.total;
      setTotalNumber(response.total);
    } catch (error) {
      console.error("error fetching customer data", error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };
  // const fetchCustomerGroupNameById = async (id) => {
  //   try {
  //     const res = await axiosInstance.get(`/md_customer_group/${id}/edit`);
  //     console.log("Group Name Response:", res.data.group_name);
  //     return res.data.group_name;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // };

  // const fetchCustomer = async () => {
  //   setIsLoading(true);
  //   await axiosInstance
  //      .get("/md_customer")
  //      .then((response) => {
  //        console.log("API Response:", response.data);
  //        setCustomers(response.data);
  //         })
  //      .catch((error) => {
  //        console.error("Error fetching customer data", error);
  //      })
  //      finally {
  //       setIsLoading(false);
  //     }
  //  };

  const handleCustomerDelete = (id) => {
    setCustomerToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (customerToDelete) {
      try {
        await axiosInstance.delete(`/md_customer/${customerToDelete}`);
        fetchCustomer()
          .then(() => setIsLoading(false))
          .catch((error) => {
            console.error("Error fetching customer data", error);
          });
        toast.success("Customer deleted successfully", {
          autoClose: 3000,
          closeButton: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setCustomerToDelete(null);
    setShowDeleteModal(false);
  };

  console.log(customers);
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col xl={12}>
            <div className="d-flex justify-content-between align-items-center">
              <h5>Customer</h5>
            </div>
          </Col>

          <Col md={12}>
            <Row>
              <Col md={12}>
                <Row>
                  <Box className="">
                    <Box className="receipt-tab">
                      <Col md={9}>
                        <Row>
                          <Col md={3}>
                            <div style={{ position: "relative",width:"80%" }}>
                              <Form.Control
                                type="search"
                                placeholder="Name  "
                                className="search-pl"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "10px",
                                  transform: "translateY(-50%)",
                                  fontSize: "10px",
                                }}
                              >
                                <button type="submit">
                                  <FontAwesomeIcon icon={faSearch} />
                                </button>
                              </span>
                            </div>
                          </Col>

                          <Col md={3}>
                            <div style={{ position: "relative", width:"80%" }}>
                              <Form.Control
                                type="search"
                                placeholder="Phone"
                                className="search-pl"
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "10px",
                                  transform: "translateY(-50%)",
                                  fontSize: "10px",
                                }}
                              >
                                <button type="submit">
                                  <FontAwesomeIcon icon={faSearch} />
                                </button>
                              </span>
                            </div>
                          </Col>

                          <Col md={5}>
                            <Row>
                              <Col md={6}>
                                <MultiSelectNoLabel
                                  label="Group"
                                  style={{height:"1.8rem",width:"80%"}}
                                  options={[
                                    { label: "All ", value: "All" },
                                    {
                                      label: "Customers with debit ",
                                      value: "Customers with debit",
                                    },
                                    {
                                      label: "Balance customers ",
                                      value: "Balance customers",
                                    },
                                  ]}
                                />
                              </Col>
                              <Col md={6}>
                                <LabelField
                                  option={[
                                    "All",
                                    "Customers with debit",
                                    "Balance customers",
                                  ]}
                                  fieldSize="w-100 h-md"
                                  style={{ backgroundSize: "15px",height:"1.8rem" }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={2} sm={12}>
                        <Link to={"/customer-create"} style={{marginLeft:"30%" }}>
                          <button className="acc-create-btn rs-btn-create w-80 text-center"  >
                            <FontAwesomeIcon icon={faPlus} /> Create
                          </button>
                        </Link>
                      </Col>
                    </Box>
                  </Box>
                </Row>
              </Col>
              <Col md={12}>
                <Box className="payment-sale-table-wrap">
                  <Table className="sale-m-table" responsive>
                    <thead className="mc-table-head thead-dark">
                      <tr>
                        <th style={{ fontSize: "8px",width:"0%" }}>
                          Name
                          <button
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        {/* <th style={{ fontSize: "8px" }}>Code</th> */}
                        <th style={{ fontSize: "8px" }}>Phone</th>
                        <th style={{ fontSize: "8px" }}>address</th>
                        <th style={{ fontSize: "8px" }}>E-mail</th>
                        <th style={{ fontSize: "8px" }}> Description</th>
                        <th style={{ fontSize: "8px" }}>DOB</th>
                        <th style={{ fontSize: "8px" }}> gender</th>
                        <th style={{ fontSize: "8px" }}> Group</th>
                        <th style={{ fontSize: "8px" }}>Active</th>
                        <th style={{ fontSize: "8px" }}> Balance</th>
                        {/* <th style={{ fontSize: "8px" }}>Source</th> */}
                        <th style={{ fontSize: "8px" }}>Country</th>
                        <th style={{ fontSize: "8px" }}>City</th>
                        <th style={{ fontSize: "8px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? ( // Render skeleton when loading is true
                        <>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                              <td>
                                <SkeletonCell />
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        customers.map((customer) => (
                          <tr style={{ fontSize: "10px" }} key={customer.id}>
                            <td className=" fw-bold " style={{width:"10%"}} >
                              <Link
                                className="link"
                                to={"/marketing-customer-details"}
                              >
                                {" "}
                                {customer.name}{" "}
                              </Link>
                            </td>
                            {/* <td>{customer.code}</td> */}
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.email}</td>
                            <td>{customer.description}</td>
                            <td>{customer.dob}</td>
                            <td>{customer.gender}</td>
                            <td style={{ fontSize: "10px" }}>
                              {" "}
                              {customer.group_name !== null &&
                              customer.group_name !== undefined
                              ? customer.group_name
                              : "N/A"}
                            </td>
                            {/* <td>--</td> */}
                            <td>{customer.is_active} </td>
                              <td>25.00 </td>
                            <td>{customer.country}</td>
                            <td>{customer.city}</td>
                            <td>
                              <Row>
                                <Col className="text-center">
                                  <button
                                    title="Edit"
                                    className="btnlogo"
                                    onClick={() =>
                                      handleStorageEdit(customer.id)
                                    }
                                  >
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      color="#f29b30"
                                    />
                                  </button>

                                  <button
                                    title="Delete"
                                    className="btnlogo"
                                    onClick={() =>
                                      handleCustomerDelete(customer.id)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      color="#ee3432"
                                    />
                                  </button>
                                </Col>
                              </Row>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Box>
                <CustomPagination
                  perPage={perPage}
                  totalUsers={totalNumber}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </PageLayout>
      <CustomModal
        show={showDeleteModal}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
