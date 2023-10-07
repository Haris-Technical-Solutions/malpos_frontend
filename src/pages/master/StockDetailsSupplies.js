import React,{useState} from 'react'
import { Col, Row } from 'react-bootstrap'
import { Tabs, Tab } from "react-bootstrap";

import { CardLayout } from '../../components/cards'
import IconSearchBar from '../../components/elements/IconSearchBar'
import PageLayout from '../../layouts/PageLayout'
import StockDetailsSuppliesTab from './StockDetailsSuppliesTab';

export default function StockDetailsSupplies() {
    const [key, setKey] = useState("tab1");
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    
                        Supplies #1122
                  
                </Col>
                <Col md={12}>
                 
                        <Row>
                            <Col md={3}>
                                <IconSearchBar/>
                            </Col>
                            <Col md={12}>
                            <Tabs
            id="my-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
           
          >
            <Tab eventKey="tab1" title="Supplies">
              <div className="tabContent">
               <StockDetailsSuppliesTab/>
              </div>
            </Tab>
            
          </Tabs>
                            </Col>
                        </Row>
                   
                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
