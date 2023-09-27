import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { LabelField } from '../../components/fields'
import { CardLayout } from '../../components/cards'
import PageLayout from '../../layouts/PageLayout'
import {Link} from "react-router-dom"

export default function UnitCreate() {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];
  return (
    <div>
        <PageLayout>
            <Row>
                <Col md={12}>
                    
                    <CardLayout>
                        <Col md={12}>
                    <Row>
                <Col md={12}>
                        Unit Mearsurements /Create
                </Col>
                        <Col md={4}>
                        <LabelField type={'text'} placeholder={'Name'} label={'Name'}/>
                        </Col>
                        <Col md={4}  ><LabelField type={'number'} placeholder={'Equal'} label={'Equal'}/>
                        </Col>
<Col md={4}>
                            <LabelField
                        label={'Unit'}
  type="select"
  option={options}
  placeholder="Select Unit"
  labelDir="label-col"
  fieldSize="field-select cus-w-300 h-md"
/></Col>
                        
                    <Link to={'/unit-measurement'} style={{ float:'left' }} >
                        <button className='acc-create-btn rs-btn-create'> Submit </button></Link>
                    </Row>
                    </Col>

                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    </div>
  )
}
