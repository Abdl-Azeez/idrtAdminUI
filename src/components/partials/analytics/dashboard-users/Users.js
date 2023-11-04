import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";

const elementsToRepeat = new Array(13).fill(null);

const Users = () => {
    return (
        <React.Fragment>
            <div className="nk-tb-list is-loose traffic-channel-table">
                <DataTableHead>
                    <DataTableRow className="nk-tb-channel">
                        User ID
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        NAME
                    </DataTableRow>
                </DataTableHead>
                {elementsToRepeat.map((item, i) => {
                    return (
                        <DataTableItem className="nk-tb-item" key={i} >
                            <DataTableRow className="nk-tb-channel">
                                <span>U0000{i}</span>
                            </DataTableRow>
                            <DataTableRow className="nk-tb-sessions" >
                                <span style={{ textWrap: 'nowrap' }}>Jane Doe</span>
                            </DataTableRow>
                        </DataTableItem>
                    );
                })}
            </div>
        </React.Fragment>
    );
};
export default Users;
