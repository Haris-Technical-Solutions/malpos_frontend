import React from 'react'
import { Label } from '../elements'
import { Form,InputGroup } from 'react-bootstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function InputGroupField({ label,icon}) {
    return (
        <div>
            <Label className={'inputgroup-field-label f-13'}>{label}</Label>
            <InputGroup className="mb-3 inputgroup-field">
                <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                <InputGroup.Text><FontAwesomeIcon icon={icon} /> </InputGroup.Text>
            </InputGroup>
        </div>
    )
}
