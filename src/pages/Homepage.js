import React, { useState, useEffect } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import Wallets from "../components/partials/analytics/dashboard-wallet/Wallet";
import LatestTrans from "../components/partials/analytics/dashboard-latest-transactions/latestTrans";
import { Card, Button, Modal, ModalBody, ModalHeader, FormGroup } from "reactstrap";

import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
} from "../components/Component";
import MainWallets from "../components/partials/analytics/dashboard-wallet/MainWallets";
import Users from "../components/partials/analytics/dashboard-users/Users";
import UserAddress from "../components/partials/analytics/dashboard-users/UserAddress";
import { Link } from "react-router-dom/cjs/react-router-dom";
import OrphanTnx from "../components/partials/analytics/dashboard-transaction/OrphanTnx";
import { DashboardAnalytics } from "../components/partials/analytics/dashboard-analytics";
import TnxAnalytics from "../components/partials/analytics/dashboard-transaction";

const Homepage = () => {
  const [timeFrame, setSelectedTimeFrame] = useState("1month");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState({ startDate: null, endDate: null })
  const [formData, setFormData] = useState({
    endDate: new Date(),
    startDate: new Date(),

  });


  const handleTimeFrameChange = (value) => {
    setSelectedTimeFrame(value);
  };


  return (
    <React.Fragment>
      <Head title="Dashboard" />
      <Content>
        <DashboardAnalytics />
        <Row className="g-gs py-4">
          <Col lg="7" xxl="7">
            <BlockHead size="sm" className="d-flex justify-content-between">
              <div className="nk-block-between">
                <BlockHeadContent>
                  <BlockTitle page tag="h3">
                    MAIN WALLETS
                  </BlockTitle>
                </BlockHeadContent>
              </div>
            </BlockHead>
            <Block>

              <Card className="h-100">
                <MainWallets />
              </Card>


            </Block>

          </Col>
        </Row>
        <BlockHead size="sm" className="d-flex justify-content-between">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                IDRT Transactions Overview
              </BlockTitle>
            </BlockHeadContent>
          </div>
          <div className="card-tools shrink-0 d-none d-sm-block">
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
        <TnxAnalytics timeFrame={timeFrame} date={date} />
        {/* <Row className="g-gs py-4">
          <Col lg="6" xxl="6">
            <BlockHead size="sm" className="d-flex justify-content-between">
              <div className="nk-block-between">
                <BlockHeadContent>
                  <BlockTitle page tag="h3">
                    TOP 5 WALLETS
                  </BlockTitle>
                </BlockHeadContent>
              </div>
            </BlockHead>
            <Block>

              <Card className="h-100">
                <Wallets />
              </Card>


            </Block>
          </Col>

        </Row> */}
        <BlockHead size="sm" className="d-flex justify-content-between pb-2 pt-5">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                ORPHAN TRANSACTIONS
              </BlockTitle>
            </BlockHeadContent>
          </div>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col lg="12" xxl="12">
              <Card className="h-100">
                <OrphanTnx />
              </Card>

            </Col>
          </Row>

        </Block>
        <BlockHead size="sm" className="d-flex justify-content-between pt-5">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                LATEST INCOMING TRANSACTIONS
              </BlockTitle>
            </BlockHeadContent>
          </div>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col lg="12" xxl="12">
              <Card className="h-100">
                <LatestTrans />
                <Link to='/transactions'>
                  <Button size="sm" color="" className="btn-light font-size-10 text-center w-100"><span>VIEW ALL TRANSACTIONS</span></Button>

                </Link>
              </Card>

            </Col>
          </Row>

        </Block>

        {/* <Col xxl="12">
          <div className="d-flex pt-5" style={{ gap: '5px' }}>
            <Col>
              <BlockHead size="sm" className="d-flex justify-content-between">
                <div className="nk-block-between">
                  <BlockHeadContent>
                    <BlockTitle page tag="h3">
                      Users
                    </BlockTitle>
                  </BlockHeadContent>
                </div>
              </BlockHead>
              <Block>
                <Card className="h-100">
                  <Users />
                  <Button size="sm" className="btn-light font-size-10 text-center"><span>VIEW ALL</span></Button>
                </Card>
              </Block>
            </Col>
            <Col>
              <BlockHead size="sm" className="d-flex justify-content-between">
                <div className="nk-block-between">
                  <BlockHeadContent>
                    <BlockTitle page tag="h3">
                      User Address
                    </BlockTitle>
                  </BlockHeadContent>
                </div>
              </BlockHead>
              <Block>
                <Card className="h-100">
                  <UserAddress />
                  <Button size="sm" className="btn-light font-size-10 text-center"><span>VIEW ALL</span></Button>
                </Card>
              </Block>
            </Col>
          </div>
        </Col> */}
        <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} className="modal-dialog-centered" size="sm">
          <ModalHeader toggle={() => setShowModal(false)}>
            Date Filter
          </ModalHeader>
          <ModalBody>
            <div >
              <Row className="g-3">
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="startDate">
                      Start Date
                    </label>
                    <FormGroup>
                      <div className="form-control-wrap">
                        <input type="date" className="form-control" id="startDate" defaultValue={formData.startDate} selected={formData.startDate}

                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
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
                        <input type="date" className="form-control" id="endDate" defaultValue={formData.endDate} selected={formData.endDate}

                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                      </div>
                    </FormGroup>
                    {/* {errors.endDate && <span className="invalid">{errors.endDate.message}</span>} */}
                  </div>
                </Col>
                <Col size="12">
                  <Button color="primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    setSelectedTimeFrame('customRange')
                    setDate(formData);
                    setShowModal(false);
                  }}>
                    <span>Filter</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </ModalBody >
        </Modal >
      </Content >
    </React.Fragment >
  );
};

export default Homepage;
