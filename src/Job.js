import React from 'react'
import { Card } from 'react-bootstrap'

export default function Job (props) {
    return (
        <Card className="my-4">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {props.job.title} - <span className="ext-muted font-weight-light">{props.job.company}</span>
                        </Card.Title>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}