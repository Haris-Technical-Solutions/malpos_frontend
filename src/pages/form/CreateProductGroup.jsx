import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";

export default function CreateProductGroup() {
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            
              <h3>Add New Group</h3>
    
          </Col>
          <Col md={12}>
            <form>
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={4}>
                        <MultiSelectField
                          label="Role"
                          name="role"
                          type="select"
                          title="Client"
                        />
                      </Col>
                      <Col md={4}>
                        <MultiSelectField
                          label="Role"
                          name="role"
                          type="select"
                          title="Brand"
                        />
                      </Col>
                      <Col md={4}>
                        <MultiSelectField
                          label="Role"
                          name="role"
                          type="select"
                          title="Branch"
                        />
                      </Col>
                      <Col md={6}>
                        <LabelField
                          label="Group name"
                          name="name"
                          type="text"
                          placeholder="Enter group name"
                        />
                      </Col>
                      <Col md={6}>
                        <LabelField
                          label="Group Description"
                          name="name"
                          type="textarea"
                          placeholder="Enter group desc"
                        />
                      </Col>
                      <Col md={12}>
                        <button className="cus-btn"> Create</button>
                        <Link to="/product-group">
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
                      </Col>
                    </Row>
                  </Col>
                </Row>
            </form>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
