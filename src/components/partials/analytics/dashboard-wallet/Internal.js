import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";

const elementsToRepeat = new Array(13).fill(null);

const Internal = () => {
    return (
        <React.Fragment>
            <div className="nk-tb-list is-loose traffic-channel-table">
                <DataTableHead>
                    <DataTableRow className="nk-tb-channel">
                        ID
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        ADDRESS
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
                        </DataTableItem>
                    );
                })}
            </div>
        </React.Fragment>
    );
};
export default Internal;
