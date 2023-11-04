import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";

const elementsToRepeat = new Array(13).fill(null);

const UserAddress = () => {
  return (
    <React.Fragment>
      <div className="nk-tb-list is-loose traffic-channel-table">
        <DataTableHead>
          <DataTableRow className="nk-tb-channel">
            User ID
          </DataTableRow>
          <DataTableRow className="nk-tb-sessions">
            ADDRESS
          </DataTableRow>
          <DataTableRow className="nk-tb-sessions">
            VERSION
          </DataTableRow>
          <DataTableRow className="nk-tb-sessions">
            <span style={{ textWrap: 'wrap' }}>UPDATE TIME</span>
          </DataTableRow>
        </DataTableHead>
        {elementsToRepeat.map((item, i) => {
          return (
            <DataTableItem className="nk-tb-item" key={i} >
              <DataTableRow className="nk-tb-channel">
                <span>0000{i}</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-sessions text-info">
                <span>xc04c4e2788858ded9554a7EB1392e760A8E7E341</span>
              </DataTableRow>
              <DataTableRow className="nk-tb-sessions text-info">
              </DataTableRow>
              <DataTableRow className="nk-tb-sessions text-info">
              </DataTableRow>
            </DataTableItem>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default UserAddress;
