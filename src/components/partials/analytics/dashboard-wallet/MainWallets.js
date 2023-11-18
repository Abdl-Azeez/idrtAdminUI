import React, { useEffect, useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";



const MainWallets = () => {
    return (
        <React.Fragment>
            <div className="nk-tb-list is-loose traffic-channel-table">


                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel">
                        <span>Merchant Wallet</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions text-info">
                        <span>xc04c4e2788858ded9554a7EB1392e760A8E7E341</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        50 IDRT
                    </DataTableRow>
                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel">
                        <span>Commission Fee Wallet</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions text-info">
                        <span>xc04c4e2788858ded9554a7EB1392e760A8E7E341</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        2 IDRT
                    </DataTableRow>
                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel">
                        <span>BNB Vault Wallet</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions text-info">
                        <span>xc04c4e2788858ded9554a7EB1392e760A8E7E341</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        2000 BNB
                    </DataTableRow>
                </DataTableItem>

            </div>
        </React.Fragment>
    );
};
export default MainWallets;
