import React, { useState,useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import CustomPagination from "../../components/CustomPagination";
import CustomModal from "./Modal"
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,faEdit, faTrash,
  faPlus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "../../components/elements";
import { Table } from "react-bootstrap";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import SkeletonCell from "../../components/Skeleton";
import { Link, useNavigate } from "react-router-dom";
export default function CustomerGroup() {
  const navigate=useNavigate()
  const [sortOrder, setSortOrder] = useState("asc");
const[customergroup, setCustomergroup]=useState([])
const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 
  const [totalNumber, setTotalNumber] = useState(0); 
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customergroupToDelete, setCustomergroupToDelete] = useState(null);

  const [setState] = useState({
    showOption: false,
    productOpen: false,
    storageOpen: false,
    accountOpen: false,
    typeOpen: false,
    categoryOpen: false,
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchCustomergroup();
  };

  const handleStateChange = (key) => {
    setState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((k) => {
        newState[k] = k === key ? !prevState[k] : false;
      });      return newState;
    });
  };

  useEffect(() => {
    fetchCustomergroup().then(() => setIsLoading(false))
    .catch((error) => {
      console.error("Error fetching supply data", error);
    })
      }, [searchTerm,currentPage]);
    
      const fetchCustomergroup = async () => {
        setIsLoading(true);
        try {
          const response = await axiosInstance.get("/md_customer_group",{params: {
            search: searchTerm,
            page: currentPage,
          },});
          setCustomergroup(response.data);
          // const totalItems= response.data.total; 
    setTotalNumber(response.data.length);
        } catch (error) {
          console.log(error);
          console.error("error while fetching customer group", error)
        } 
      };
      console.log(customergroup)


      const handleCustomergroupDelete = (id) => {
        setCustomergroupToDelete(id);
        setShowDeleteModal(true);
      };
    
      const confirmDelete = async () => {
        if (customergroupToDelete) {
          try {
            await axiosInstance.delete(`/md_customer_group/${customergroupToDelete}`);
            fetchCustomergroup()
            .then(() => setIsLoading(false))
            .catch((error) => {
              console.error("Error fetching customer Group data", error);
            });
            toast.success("Customer Group deleted successfully", {
              autoClose: 3000,
              closeButton: true,
            });
          } catch (error) {
            console.log(error);
          }
          setShowDeleteModal(false);
      };}
    
      const cancelDelete = () => {
        setCustomergroupToDelete(null);
        setShowDeleteModal(false);
      };
      const handleStorageEdit = (id) =>{
        console.log("id: " + id);
        navigate(`/Customergroup-edit/`, {
          state: {
            id: id,
            action: "updateCustomergroup",
          },
        });
      };
  


      // const handleCustomergroupDelete = async (id) => {
      //   try {
      //     await axiosInstance.delete(`/md_customer_group/${id}`);
      //     fetchCustomer()
      //     .then(() => setIsLoading(false))
      //     .catch((error) => {
      //       console.error("Error fetching customer Group data", error);
      //     });
      //     toast.success("Customer Group deleted successfully", {
      //       autoClose: false,
      //       closeButton: true,
      //     });
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };


      // const fetchCustomergroup = async () => {
        
      //   await axiosInstance
      //      .get("/md_customer_group")
      //      .then((response) => {
      //        console.log("API Response:", response.data);
      //        setCustomergroup(response.data);
      //         })
      //      .catch((error) => {
      //        console.error("Error fetching customer data", error);
      //      });
      //  };


  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
                    Customer Group
          </Col>
          <Col md={12}>
        
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={3}>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
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
                            fontSize: "14px",
                          }}
                        >
                          <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </span>
                      </div>
                    </Col>
                    <Col md={9}>
                      <Link to={"/create-customergroup"} style={{ float: "right" }}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className={"pacakes-table-wrap"}>
                        <Table>
                          <thead className="thead-dark">
                            <tr>
                              <th className="th-w30">
                                Name
                                <button
                                  className="sorting-icon"
                                  onClick={toggleSortOrder}
                                >
                                  {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th className="th-w30">
                                Discount Value
                                <button
                                  className="sorting-icon"
                                  onClick={toggleSortOrder}
                                >
                                  {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                              </th>
                              <th className="th-w30">type</th>
                              <th className="th-w30">Balance</th>
                              <th className="th-w10">Actions</th>
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
                   
                            customergroup.map((item)=>(
                            <tr key={item.id}>
                              <td className="th-w30">{item.group_name}</td>
                              <td className="th-w30">{item.discount}</td>
                              <td className="th-w30">{item.type}</td>
                              <td className="th-w30">10</td>
                              <td className="th-w10">
                              <Row>
                                    <Col className="text-center">
                                      <button
                                        title="Edit"
                                        className="btnlogo"
                                        onClick={()=>handleStorageEdit(item.id)}
                                      >            <FontAwesomeIcon icon={faEdit} color="#f29b30"/>
                                      </button>
                                      <button
                                        title="Delete"
                                         className="btnlogo"
                                         onClick={()=>handleCustomergroupDelete(item.id)} 
                                          >
                                     <FontAwesomeIcon icon={faTrash} color="#ee3432"/>
                                      </button>
                                      </Col>                             
                                          </Row>
                              </td>
                            </tr>
)))}
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
