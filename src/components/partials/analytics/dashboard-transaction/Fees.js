import React from "react";
import { TransactionLineChart, WPCharts } from "../../charts/analytics/AnalyticsCharts";
import { PreviewAltCard } from "../../../Component";
import { Col, Row } from "reactstrap";
import moment from "moment";

const Fees = ({ dateRange, data }) => {


  const dateFormat = (inputDateString) => {

    const year = inputDateString.substring(0, 4);
    const month = inputDateString.substring(4, 6);
    const day = inputDateString.substring(6, 8);

    return `${year}-${month}-${day}`;
  }
  const sortDate = (data) => {
    if (data?.length > 0) {
      data.sort((a, b) => new Date(dateFormat(a?.transactionDate)) - new Date(dateFormat(b?.transactionDate)));
      const midIndex = Math.floor(data.length / 2);
      const earliestDate = dateFormat(data[0].transactionDate);
      const midDate = dateFormat(data[midIndex].transactionDate);
      const latestDate = dateFormat(data[data.length - 1].transactionDate);

      return { earliestDate, midDate, latestDate };
    }
    return null
  }

  const calculateStepSizeForOutGas = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    let maxOutGas = -Infinity;
    data.forEach((transaction) => {
      const outGas = parseInt(transaction.outGasFee / 1000000000000000000);
      if (outGas > maxOutGas) {
        maxOutGas = outGas;
      }
    });

    // Calculate the step size to ensure 4 rows on the y-axis
    const desiredRowCount = 4;
    const stepSize = Math.ceil(maxOutGas / (desiredRowCount - 1));

    return stepSize;
  };

  const outGasStepSize = calculateStepSizeForOutGas(data);

  const calculateStepSizeForCom = (data) => {
    if (!data || data.length === 0) {
      return null;
    }

    let maxOutGas = -Infinity;

    data.forEach((transaction) => {
      const inCommission = parseInt(transaction.inCommission / 1000000);

      if (inCommission > maxOutGas) {
        maxOutGas = inCommission;
      }
    });

    // Calculate the step size to ensure 4 rows on the y-axis
    const desiredRowCount = 4;
    const stepSize = Math.ceil(maxOutGas / (desiredRowCount - 1));

    return stepSize;
  };

  const comStepSize = calculateStepSizeForCom(data);


  const getAllNoOfGasOut = (data) => {
    return data?.map(entry => entry.outGasFee / 1000000000000000000);
  }
  const getAllDate = (data) => {
    return data?.map(entry => moment(dateFormat(entry.transactionDate)).format('DD MMM, YYYY'));
  }

  const getAllNoOfInCom = (data) => {
    return data?.map(entry => entry.inCommission / 1000000);
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
            <div className="card-title-group align-start pt-3 pb-2 g-2">
              <div className="card-title card-title-sm">
                <h6 className="title">Commission (IDRT)</h6>
              </div>
              <div className="card-tools">
                {/* <TooltipComponent
                  iconClass="card-hint"
                  icon="help"
                  direction="left"
                  id="tooltip-perfomance"
                  text="Performance of this month"
                ></TooltipComponent> */}
              </div>
            </div>
            <div className="analytic-wp">
              <div className="analytic-wp-group g-3">
                <div className="analytic-data analytic-wp-data w-100">
                  <div className="analytic-wp-graph w-100">
                    <div className="analytic-wp-ck h-100">
                      {data &&
                        <TransactionLineChart data={ComData} stepSize={comStepSize} />}
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
        <Col md={6}>
          <PreviewAltCard className="h-100">
            <div className="card-title-group align-start pb-2 g-2">
              <div className="card-title card-title-sm">
                <h6 className="title">Transaction Fees (BNB)</h6>
                <p>The fees for {dateRange()}.</p>
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
