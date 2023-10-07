import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Button } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import PreparationTabs from "../../components/Tabs/PreparationTabs";
import data from "../../data/master/preparationList.json";
import { Link, useLocation } from "react-router-dom";
export default function PreparationView() {
  const location = useLocation();
  const { id } = location.state;
  return (
    <PageLayout>
      <div className="mb-4">
        {data?.preparation.tbody
          .filter((item) => {
            return item.id == id;
          })
          .map((item, i) => (
            <Box className="productedit-edit">
              <h3>
                #{item.item}: {item.heading}
              </h3>
              <Box className="addproduct-new">
                <Link to="/preparation" className="addproduct-btn ">
                  <img
                    className="fas fa-user"
                    src="/images/icons/close1.png"
                    alt="Close"
                  />
                </Link>
              </Box>
            </Box>
          ))}
      </div>
      <div className="my-div">
        <Row>
          <Col md={12}>
            <PreparationTabs />
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
}
