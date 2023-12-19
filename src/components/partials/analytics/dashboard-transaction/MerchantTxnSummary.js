import React from "react";
import { IDRTLineChart, TransactionLineChart } from "../../charts/analytics/AnalyticsCharts.js";
import { formatNumber } from "../../../../utils/Utils.js";
import moment from "moment";
import { Col, Row } from "../../../Component.js";
import { Card } from 'reactstrap';

const MerchantTxnSummary = ({ dateRange, data, role }) => {
    return (
        <React.Fragment>
            <div className="pl-3 mr-auto w-75 d-flex flex-column justify-content-center" style={{ gap: '10px' }} md={12}>
                <Row className="d-flex justify-content-between">
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total # of {role === "AGENT" ? "Merchants" : "Users"}</p>
                        <h5 className="w-80 text-dark">5,000</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Average Deposit per {role === "AGENT" ? "Merchant" : "User"}</p>
                        <h5 className="w-80 text-dark">$100</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Average # of Deposits per {role === "AGENT" ? "Merchant" : "User"}</p>
                        <h5 className="w-80 text-dark">4</h5>
                    </Card>
                </Row>
                <Row className="d-flex justify-content-between">
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total Deposit Amount</p>
                        <h5 className="w-80 text-dark">$20,000.00</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total # of Deposits</p>
                        <h5 className="w-80 text-dark">5,000</h5>
                    </Card>
                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow mt-0" style={{ width: '220px' }}>
                        <p style={{ fontSize: '20px' }}>Total Commission Amount</p>
                        <h5 className="w-80 text-dark">$10,000.00</h5>
                    </Card>
                </Row>
            </div>
        </React.Fragment>
    );
};
export default MerchantTxnSummary;
