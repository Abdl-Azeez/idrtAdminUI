import React, { useState, useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { Card, Button, Modal, ModalBody, ModalHeader, FormGroup } from "reactstrap";

import { Block, BlockHead, BlockHeadContent, BlockTitle, Row, Col } from "../components/Component";
import MainWallets from "../components/partials/analytics/dashboard-wallet/MainWallets";

import OrphanTnx from "../components/partials/analytics/dashboard-transaction/OrphanTnx";
import { DashboardAnalytics } from "../components/partials/analytics/dashboard-analytics";
import TnxAnalytics from "../components/partials/analytics/dashboard-transaction";
import LatestIncomingTrans from "../components/partials/analytics/dashboard-latest-transactions/latestIncomingTrans";
import LatestOutgoingTrans from "../components/partials/analytics/dashboard-latest-transactions/latestOutgoingTrans";
import AccountOverview from "../components/partials/analytics/dashboard-wallet/AccountOverview";
import TopMerchants from "../components/partials/analytics/dashboard-latest-transactions/topMerchants";

const Homepage = () => {
  const [timeFrame, setSelectedTimeFrame] = useState("1month");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState({ startDate: null, endDate: null });
  const [formData, setFormData] = useState({
    endDate: new Date(),
    startDate: new Date(),
  });
  let role = localStorage.getItem("idrtRole") ? JSON.parse(localStorage.getItem("idrtRole")) : null;

  const handleTimeFrameChange = (value) => {
    setSelectedTimeFrame(value);
  };

  return (
    <React.Fragment>
      <Head title="Dashboard" />
      <Content>
        {/* <DashboardAnalytics /> */}

        {/* MAIN WALLETS */}
        <h3 className="text-dark pb-2 text-capitalize">
          Hello, <span style={{ letterSpacing: "2px" }}>{role.toLowerCase()}</span>
        </h3>

        {role !== "ADMIN" ? <AccountOverview role={role} /> : <MainWallets role={role} />}

        {/* IDRT Transactions Overview */}
        <BlockHead size="sm" className={`d-flex justify-content-between pt-3 ${role !== "ADMIN" ? "col-md-9" : ""}`}>
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                {role === "ADMIN" ? "IDRT Transactions Overview" : "Trend Analysis"}
              </BlockTitle>
            </BlockHeadContent>
          </div>
          <div className={`card-tools shrink-0 d-none d-sm-block ${role !== "ADMIN" ? "" : "mr-5"}`}>
            <ul className="nav nav-switch-s2 nav-tabs bg-white">
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "today" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeFrameChange("today");
                  }}
                >
                  Today
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "7days" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeFrameChange("7days");
                  }}
                >
                  7 D
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "1month" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeFrameChange("1month");
                  }}
                >
                  1 M
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "monthToDate" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeFrameChange("monthToDate");
                  }}
                >
                  MTD
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "1year" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeFrameChange("1year");
                  }}
                >
                  1 Y
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "yearToDate" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTimeFrameChange("yearToDate");
                  }}
                >
                  YTD
                </a>
              </li>

              <li>
                <Button
                  className="ml-2 toggle d-none d-md-inline-flex"
                  color="primary"
                  size="sm"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <span>Edit Date</span>
                </Button>
              </li>
            </ul>
          </div>
        </BlockHead>

        {/* Transaction Analytics And Charts */}
        <TnxAnalytics timeFrame={timeFrame} date={date} role={role} />

        {/* ORPHAN TRANSACTIONS */}
        {role === "ADMIN" && <OrphanTnx />}

        {role === "AGENT" ? (
          <TopMerchants />
        ) : (
          <>
            {/* LATEST INCOMING TRANSACTIONS */}
            <LatestIncomingTrans />

            {/* LATEST OUTGOING TRANSACTIONS */}
            <LatestOutgoingTrans />
          </>
        )}

        <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} className="modal-dialog-centered" size="sm">
          <ModalHeader toggle={() => setShowModal(false)}>Date Filter</ModalHeader>
          <ModalBody>
            <div>
              <Row className="g-3">
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="startDate">
                      Start Date
                    </label>
                    <FormGroup>
                      <div className="form-control-wrap">
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          defaultValue={formData.startDate}
                          selected={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                      </div>
                    </FormGroup>
                    {/* {errors.startDate && <span className="invalid">{errors.startDate.message}</span>} */}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="endDate">
                      End Date
                    </label>
                    <FormGroup>
                      <div className="form-control-wrap">
                        <input
                          type="date"
                          className="form-control"
                          id="endDate"
                          defaultValue={formData.endDate}
                          selected={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        />
                      </div>
                    </FormGroup>
                    {/* {errors.endDate && <span className="invalid">{errors.endDate.message}</span>} */}
                  </div>
                </Col>
                <Col size="12">
                  <Button
                    color="primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTimeFrame("customRange");
                      setDate(formData);
                      setShowModal(false);
                    }}
                  >
                    <span>Filter</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default Homepage;
