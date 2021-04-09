import React from 'react'
import { Form } from 'react-bootstrap'

export default function SearchForm ({ params, handleSearchEvent }) {
    return (
        <Form>
            <Form.Row className="align-items-end">
                <Form.Group controlId="description" className="mr-4">
                    <Form.Label>Desscription</Form.Label>
                    <Form.Control type="text" value={params['description']} onChange={handleSearchEvent} />
                </Form.Group>
                <Form.Group controlId="location" className="mr-4">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" value={params['location']} onChange={handleSearchEvent} />
                </Form.Group>
            </Form.Row>
        </Form>
    );
}