import React from "react";
import { useState } from "react";
import { Row, Col, Form, Table,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardLayout } from "../../components/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faCaretRight,
  faEdit, faTrash, faEllipsis,
  faCaretDown,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
export default function AccountCatgories() {
  const [expandedRows, setExpandedRows] = useState([]);
  const [open, Close] = useState(false);

  const handleDotBox = () => {
      Close(!open);
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>

              <Row>
        <Col md={12}>
           Chart Of Accounts
          </Col>
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      {/* <Row> */}
                      <Col md={5}>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type="search"
                            placeholder="Search"
                            className="search-pl"
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
                      {/* </Row> */}
                    </Col>
                    <Col md={6} className="col-6-create-btn">
                      <Link to={"/categories-create"}>
                        <button className="acc-create-btn">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Table className="acc-categories-parent-table">
                    <thead style={{backgroundColor:'#F07632',color:"white", textAlign:"center",
  lineHeight: "5px"}}>
                      <tr>
                        <th className="th-w20">Code</th>
                        <th className="th-w20">Name</th>
                        <th className="th-w20">Type</th>
                        <th className="th-w20">Parent_account</th>
                        <th className="th-w20">Seqno</th>
                        <th className="th-w20">Summary(Y/N)</th>
                        <th className="th-w20">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      
                        <React.Fragment>
                        <tr style={{textAlign:"center"}}>
    <td className="td-w20">123</td>
    <td className="td-w20" >Category 1</td>
    <td className="td-w20">Type A</td>
    <td className="td-w20">Parent 1</td>
    <td className="td-w20">001</td>
    <td className="td-w20" style={{ paddingLeft: "1rem" }}>YES</td>
    <td className="td-w20">
      
   <Link to={"/category-edit"} > <button  title="Edit" className="btnlogo" >
                                  <FontAwesomeIcon icon={faEdit} color="#f29b30" />
                                </button></Link>
                                <button title="Delete" className="btnlogo"  >
                                  <FontAwesomeIcon icon={faTrash} color="#ee3432"/> </button>
          </td>
  </tr>
  <tr style={{textAlign:"center"}}>
    <td className="td-w20">456</td>
    <td className="td-w20">Category 2</td>
    <td className="td-w20">Type B</td>
    <td className="td-w20">Parent 2</td>
    <td className="td-w20">002</td>
    <td className="td-w20" style={{ paddingLeft: "1.5rem" }}>NO</td>
    <td className="td-w20">
      <Box className="dot-content">
        <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
        {open ? (
          <Box className="DotBox-main-wrapper">
            <Box className="DotBox-inner">
              <Link to={'/category-edit'}>
                <Box className="DotBox-p-con">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Box>
              </Link>
              <Box className="DotBox-p-con">
                <FontAwesomeIcon icon={faTrash} /> Remove
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </td>
  </tr>
  <tr style={{textAlign:"center"}}>
    <td className="td-w20">789</td>
    <td className="td-w20">Category 3</td>
    <td className="td-w20">Type C</td>
    <td className="td-w20">Parent 3</td>
    <td className="td-w20">003</td>
    <td className="td-w20" style={{ paddingLeft: "1.5rem" }}>YES</td>
    <td className="td-w20">
      <Box className="dot-content">
        <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
        {open ? (
          <Box className="DotBox-main-wrapper">
            <Box className="DotBox-inner">
              <Link to={'/category-edit'}>
                <Box className="DotBox-p-con">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Box>
              </Link>
              <Box className="DotBox-p-con">
                <FontAwesomeIcon icon={faTrash} /> Remove
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </td>
  </tr>
  <tr style={{textAlign:"center"}}>
    <td className="td-w20">101</td>
    <td className="td-w20">Category 4</td>
    <td className="td-w20">Type D</td>
    <td className="td-w20">Parent 4</td>
    <td className="td-w20">004</td>
    <td className="td-w20" style={{ paddingLeft: "1.5rem" }}>NO</td>
    <td className="td-w20 ">
      <Box className="dot-content">
        <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
        {open ? (
          <Box className="DotBox-main-wrapper">
            <Box className="DotBox-inner">
              <Link to={'/category-edit'}>
                <Box className="DotBox-p-con">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </Box>
              </Link>
              <Box className="DotBox-p-con">
                <FontAwesomeIcon icon={faTrash} /> Remove
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </td>
  </tr>
                        </React.Fragment>
                    </tbody>
                  </Table>
                </Col>
              </Row>
        
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
