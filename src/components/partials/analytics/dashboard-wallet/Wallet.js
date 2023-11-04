import React, { useEffect, useState } from "react";
import {
  topWalletsData,
} from "../../charts/analytics/AnalyticsData";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";
import { WPCharts } from "../../charts/analytics/AnalyticsCharts";

const Wallet = () => {


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
        {topWalletsData.map((item) => {
          return (
            <DataTableItem className="nk-tb-item" key={item.id}>
              <DataTableRow className="nk-tb-channel">
                <span className="tb-lead text-info">{item.channel}</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-sessions">
                <span className="tb-sub tb-amount">
                  <span className="font-weight-bolder">{item.sessions}</span>
                </span>
              </DataTableRow>
              <DataTableRow className="nk-tb-prev-sessions">
                <span className="tb-sub tb-amount">
                  <span className="font-weight-bolder">{item.prev}</span>
                </span>
              </DataTableRow>

            </DataTableItem>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default Wallet;
