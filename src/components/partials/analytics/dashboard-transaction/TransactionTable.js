import React, { useEffect, useState } from "react";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";

const elementsToRepeat = new Array(13).fill(null);

const TransactionTable = () => {
    return (
        <React.Fragment>
            <div className="nk-tb-list is-loose traffic-channel-table">
                <DataTableHead>
                    <DataTableRow className="nk-tb-channel">

                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        TOTAL IN
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        TOTAL OUT
                    </DataTableRow>
                </DataTableHead>

                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <span>No. of Transactions</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions ">
                        <span>10,000</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>10,000/2</span>
                    </DataTableRow>

                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <span>IDRT</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>100,000,000</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>8,000,000</span>
                    </DataTableRow>

                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <span>Commssion</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>0</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>8,000,000</span>
                    </DataTableRow>

                </DataTableItem>

                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <span>Transaction Fee</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>0</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>50 BNB</span>
                    </DataTableRow>

                </DataTableItem>

            </div>
        </React.Fragment>
    );
};
export default TransactionTable;
