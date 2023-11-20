import React from "react";
import { TimeOnSiteData, NewUsersData, PageviewsData, BounceRateData } from "../../charts/analytics/AnalyticsData";
import { TransactionLineChart, WPCharts } from "../../charts/analytics/AnalyticsCharts";
import { StoreVisitorsChart } from "../../charts/e-commerce/EcomCharts";
import { Icon, PreviewAltCard, TooltipComponent } from "../../../Component";
import { Col, Row } from "reactstrap";
import moment from "moment";

const Fees = ({ dateRange, data }) => {


  const sortDate = (data) => {
    if (data) {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      const midIndex = Math.floor(data.length / 2);
      const earliestDate = data[0].date;
      const midDate = data[midIndex].date;
      const latestDate = data[data.length - 1].date;

      return { earliestDate, midDate, latestDate };
    }
    return null
  }
  const getAllNoOfGasOut = (data) => {
    return data?.map(entry => entry.outGasFee / 1000000000000000000);
  }
  const getAllDate = (data) => {
    return data?.map(entry => moment(entry.date).format('DD MMM, YYYY'));
  }


  const getAllNoOfInCom = (data) => {
    return data?.map(entry => entry.inCommission / 1000000000000000000);
  }


  let TnxData = {
    labels: getAllDate(data),
    dataUnit: "TXN",
    datasets: [

      {
        label: "TOTAL OUT",
        color: "#798bff",
        borderWidth: 2,
        lineTension: 0,
        dash: 0,
        borderColor: "#00a859",
        backgroundColor: "transparent",
        borderCapStyle: "square",
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00a859",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
        data: getAllNoOfGasOut(data),
      },
    ],
  };
  let ComData = {
    labels: getAllDate(data),
    dataUnit: "TXN",
    datasets: [

      {
        label: "TOTAL IN",
        color: "#798bff",
        borderWidth: 2,
        lineTension: 0,
        dash: 0,
        borderColor: "#00a859",
        backgroundColor: "transparent",
        borderCapStyle: "square",
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00a859",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 4,
        data: getAllNoOfInCom(data),
      },
    ],
  };


  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <PreviewAltCard className="h-100">
            <div className="card-title-group align-start pb-2 g-2">
              <div className="card-title card-title-sm">
                <h6 className="title">Transaction Fees (BNB)</h6>
                <p>The fees for {dateRange()}.</p>
              </div>
              <div className="card-tools">
                <TooltipComponent
                  iconClass="card-hint"
                  icon="help"
                  direction="left"
                  id="tooltip-perfomance"
                  text="Performance of this month"
                ></TooltipComponent>
              </div>
            </div>
            <div className="analytic-wp">
              <div className="analytic-wp-group g-3">
                <div className="analytic-data analytic-wp-data w-100">
                  <div className="analytic-wp-graph w-100">

                    <div className="analytic-wp-ck h-100">
                      {data &&
                        <TransactionLineChart data={TnxData} stepSize={0.02} />}
                    </div>
                  </div>

                  {/* <div className="analytic-wp-text d-none">
              <div className="amount amount-sm">5,000</div>
              <div className="change up">
                <Icon name="arrow-long-up"></Icon>4.5%
              </div>
              <div className="subtitle">vs. last month</div>
            </div> */}
                </div>
                <div className="chart-label-group ml-5">
                  <div className="chart-label">{moment(sortDate(data)?.earliestDate).format('DD MMM, YYYY')}</div>
                  <div className="chart-label d-none d-sm-block">{moment(sortDate(data)?.midDate).format('DD MMM, YYYY')}</div>
                  <div className="chart-label"> {moment(sortDate(data)?.latestDate).format('DD MMM, YYYY')}</div>
                </div>
              </div>
            </div>
          </PreviewAltCard>
        </Col>
        <Col md={6}>
          <PreviewAltCard className="h-100">
            <div className="card-title-group align-start pt-3 pb-2 g-2">
              <div className="card-title card-title-sm">
                <h6 className="title">Commission Fees (IDRT)</h6>
              </div>
              <div className="card-tools">
                <TooltipComponent
                  iconClass="card-hint"
                  icon="help"
                  direction="left"
                  id="tooltip-perfomance"
                  text="Performance of this month"
                ></TooltipComponent>
              </div>
            </div>
            <div className="analytic-wp">
              <div className="analytic-wp-group g-3">
                <div className="analytic-data analytic-wp-data w-100">
                  <div className="analytic-wp-graph w-100">
                    <div className="analytic-wp-ck h-100">
                      {data &&
                        <TransactionLineChart data={ComData} stepSize={1000000000000} />}
                    </div>
                  </div>

                </div>
                <div className="chart-label-group ml-5">
                  <div className="chart-label">{moment(sortDate(data)?.earliestDate).format('DD MMM, YYYY')}</div>
                  <div className="chart-label d-none d-sm-block">{moment(sortDate(data)?.midDate).format('DD MMM, YYYY')}</div>
                  <div className="chart-label"> {moment(sortDate(data)?.latestDate).format('DD MMM, YYYY')}</div>
                </div>
              </div>
            </div>
          </PreviewAltCard>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Fees;
