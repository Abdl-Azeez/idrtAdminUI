import React, { useState } from "react";
import moment from 'moment';
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import Transaction from "../components/partials/analytics/dashboard-transaction/Transaction";
import Transfer from "../components/partials/analytics/dashboard-transfer/Transfer";
import Fees from "../components/partials/analytics/dashboard-fees/Fees";
import Wallets from "../components/partials/analytics/dashboard-wallet/Wallet";
import LatestTrans from "../components/partials/analytics/dashboard-latest-transactions/latestTrans";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  PreviewAltCard,
  BackTo,
} from "../components/Component";
import MainWallets from "../components/partials/analytics/dashboard-wallet/MainWallets";
import Users from "../components/partials/analytics/dashboard-users/Users";
import UserAddress from "../components/partials/analytics/dashboard-users/UserAddress";
import { Link } from "react-router-dom/cjs/react-router-dom";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Homepage = () => {
  const [timeFrame, setTimeFrame] = useState("Month");

  return (
    <React.Fragment>
      <Head title="Dashboard" />
      <Content>
        <Block>
          <div className="row top-cards">
            <Col md="5" lg="4" xxl="3" className="p-md-1">
              <Card className="h-100 p-1 d-flex justify-content-center shadow-none">
                <div className="d-flex">
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px' }}>Wallets Summary</p>

                  </div>
                  <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                    <div className="d-flex justify-content-between">
                      <label className="font-weight-bolder mb-0">Total:</label>
                      <p>10,000</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <label className="font-weight-bolder mb-0">Active:</label>
                      <p>8,000</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <label className="font-weight-bolder mb-0">Inactive:</label>
                      <p>2,000</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="5" xxl="4" className="p-md-1">
              <Card className="h-100 p-1 d-flex justify-content-center shadow-none">
                <div className="d-flex">
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px' }}>Total Summary</p>

                  </div>
                  <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                    <div className="d-flex justify-content-between">
                      <label className="font-weight-bolder mb-0">BNB:</label>
                      <p>1,000 (USD$ xx.xx) </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <label className="font-weight-bolder mb-0">IDRT:</label>
                      <p>3,614,132,989 (USD$ xx.xx) </p>
                    </div>

                  </div>
                </div>
              </Card>
            </Col>
            <Col className="p-md-1">
              <div className="h-100 d-flex align-items-center text-center">
                <div className="d-flex flex-column">
                  <div className="d-flex" style={{ textWrap: 'nowrap' }}>
                    <p className="mr-2 mb-0">[{`Date: ${moment().format('L')}`}</p>
                    <p className="mb-0">{`Time: ${moment().format('h:mm:ss a')}`}]</p>
                  </div>
                  <div>Timezone: {moment().format("Z")} hours UTC</div>
                </div>
              </div>
            </Col>
            <Col md="5" lg="4" xxl="3" className="p-md-1">
              <Card className="h-100 p-1 d-flex justify-content-center shadow-none">
                <div className="d-flex">
                  <div className="d-flex align-items-center">
                    <p className="mb-0 text-uppercase font-size-12 text-center" style={{ lineHeight: '13px' }}>Exchange Rate</p>

                  </div>
                  <div className="w-100 pl-3" style={{ borderLeft: "1.5px solid #80808038" }}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <label className="font-weight-bolder mb-0">BNB</label>/USD:</div>
                      <p>226.51</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <label className="font-weight-bolder mb-0">IDRT</label>/USD:</div>
                      <p>0.00006280</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </div>
        </Block>

        <BlockHead size="sm" className="d-flex justify-content-between">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                ACCOUNT SUMMARY
              </BlockTitle>
            </BlockHeadContent>
          </div>
          <div className="card-tools shrink-0 d-none d-sm-block">
            <ul className="nav nav-switch-s2 nav-tabs bg-white">
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "7 days" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    setTimeFrame("7 days");
                  }}
                >
                  7 D
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "Today" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    setTimeFrame("Today");
                  }}
                >
                  Today
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "Yesterday" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    setTimeFrame("Yesterday");
                  }}
                >
                  YTD
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "Month" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    setTimeFrame("Month");
                  }}
                >
                  1 M
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#navitem"
                  className={timeFrame === "Year" ? "nav-link active" : "nav-link"}
                  onClick={(e) => {
                    e.preventDefault();
                    setTimeFrame("Year");
                  }}
                >
                  1 Y
                </a>
              </li>
            </ul>
          </div>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col lg="7" xxl="6">
              <PreviewAltCard className="h-100">
                <Transaction timeFrame={timeFrame} />
              </PreviewAltCard>
            </Col>
            <Col md="6" lg="5" xxl="3">
              <PreviewAltCard className="h-100">
                <Transfer timeFrame={timeFrame} />
              </PreviewAltCard>
            </Col>
            <Col md="6" lg="5" xxl="3">
              <PreviewAltCard className="h-100">
                <Fees timeFrame={timeFrame} />
              </PreviewAltCard>
            </Col>
          </Row>
        </Block>
        <Row className="g-gs py-4">
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
          <Col lg="6" xxl="6">
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
        <BlockHead size="sm" className="d-flex justify-content-between pt-2">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                LATEST TRANSACTIONS
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

        <Col xxl="12">
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
        </Col>
      </Content>
    </React.Fragment>
  );
};

export default Homepage;
