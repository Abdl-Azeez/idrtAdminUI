import React, { useEffect, useState } from "react";
import {
  latestTransData,
} from "../../charts/analytics/AnalyticsData";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";
import { WPCharts } from "../../charts/analytics/AnalyticsCharts";
import moment from "moment";

const latestTrans = () => {


  return (
    <React.Fragment>

      <div className="nk-tb-list is-loose traffic-channel-table">
        {/* <DataTableHead>
          <DataTableRow className="nk-tb-channel">

          </DataTableRow>
          <DataTableRow className="nk-tb-sessions">

          </DataTableRow>
          <DataTableRow className="nk-tb-prev-sessions">
            <span>Prev Sessions</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-change">
            <span>Change</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-trend tb-col-sm text-right">
            <span>Trend</span>
          </DataTableRow>
        </DataTableHead> */}
        {latestTransData.map((item) => {
          return (
            <DataTableItem className="nk-tb-item latestTrans" key={item.id} >
              <DataTableRow className="nk-tb-channel">
                {/* <span className="tb-lead">{item.channel}</span> */}
                <div className="d-flex flex-column">
                  <span className="tb-lead">ID</span>
                  <span>10001</span>
                </div>
              </DataTableRow>
              <DataTableRow className="nk-tb-sessions">
                <div className="d-flex flex-column">
                  <span className="tb-lead">Time</span>
                  <span>{moment().format('h:mm:ss')}</span>
                </div>
              </DataTableRow>
              <DataTableRow className="nk-tb-prev-sessions">
                <div className="d-flex flex-column" style={{ maxWidth: 'fit-content' }}>
                  <span className="tb-lead">Transaction Hash</span>
                  <span>Ox502a14b68f8d7e530b6f8849dfefadfc9a7f3d1c7bb19edf375fd97984f23e23</span>
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-end">
                      <span>From: </span>
                      <span className="ml-2 tb-lead font-weight-bolder"><span className="mr-2">[external]</span>0x532c23ewB4738349DO5d9rrty04837582dEU63513</span>
                    </div>
                    <div className="d-flex justify-content-end">
                      <span>To: </span>
                      <span className="ml-2 tb-lead font-weight-bolder text-info"><span className="mr-2 text-dark">[internal]</span>xc04c4e2788858ded9554a7EB1392e760A8E7E341</span>
                    </div>

                  </div>
                </div>
              </DataTableRow>
              <DataTableRow className="nk-tb-prev-sessions">
                <div className="d-flex flex-column" style={{ gap: '15px' }}>
                  <span className="tb-lead">Amount/Currency/in USD</span>
                  <span className="font-weight-bolder">{`${item.amount}  ${item.coin}`} (USD$XX)</span>
                </div>
              </DataTableRow>
              <DataTableRow className="nk-tb-prev-sessions">
                <div className="d-flex flex-column" style={{ gap: '15px' }}>
                  <span className="tb-lead">Transaction Fee (BNB)</span>
                  <span className="font-weight-bolder">{item.fee}</span>
                </div>
              </DataTableRow>
              <DataTableRow className="nk-tb-prev-sessions">
                <div className="d-flex flex-column" style={{ gap: '15px' }}>
                  <span className="tb-lead">Type</span>
                  <span className="font-weight-bolder">{item.type}</span>
                </div>
              </DataTableRow>

            </DataTableItem>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default latestTrans;
