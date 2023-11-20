import React from "react";
import { DataTableHead, DataTableRow, DataTableItem } from "../../../Component";

const TransactionTable = ({ data }) => {
    const totalTnxIn = data?.reduce((sum, data) => {
        if (data && data.noOfInTxn) {
            return sum + Number(data.noOfInTxn);
        }
        return sum;
    }, 0);

    const totalTnxOut = data?.reduce((sum, data) => {
        if (data && data.noOfOutTxn) {
            return sum + Number(data.noOfOutTxn);
        }
        return sum;
    }, 0);

    const totalIDRT_In = data?.reduce((sum, data) => {
        if (data && data.inAmount) {
            return sum + Number(data.inAmount);
        }
        return sum;
    }, 0);


    const totalIDRT_Out = data?.reduce((sum, data) => {
        if (data && data.outAmount) {
            return sum + Number(data.outAmount);
        }
        return sum;
    }, 0);

    const totalCommissionIn = data?.reduce((sum, data) => {
        if (data && data.inCommission) {
            return sum + Number(data.inCommission);
        }
        return sum;
    }, 0);

    const totalCommissionOut = data?.reduce((sum, data) => {
        if (data && data.outCommission) {
            return sum + Number(data.outCommission);
        }
        return sum;
    }, 0);

    const totalFeeIn = data?.reduce((sum, data) => {
        if (data && data.inGasFee) {
            return sum + Number(data.inGasFee);
        }
        return sum;
    }, 0);

    const totalFeeOut = data?.reduce((sum, data) => {
        if (data && data.outGasFee) {
            return sum + Number(data.outGasFee);
        }
        return sum;
    }, 0);

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
                        <span>{totalTnxIn ? totalTnxIn?.toLocaleString() : 0}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>{totalTnxOut ? (totalTnxOut / 2).toLocaleString() : 0}</span>
                    </DataTableRow>

                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <span>IDRT</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>{totalIDRT_In ? (totalIDRT_In >= 1000000000000000000 ? (totalIDRT_In / 1000000000000000000)?.toLocaleString() : totalIDRT_In?.toLocaleString()) : 0}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>{totalIDRT_Out ? (totalIDRT_Out >= 1000000000000000000 ? (totalIDRT_Out / 1000000000000000000)?.toLocaleString() : totalIDRT_Out?.toLocaleString()) : 0}</span>
                    </DataTableRow>

                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <span>Commssion</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>{totalCommissionIn ? (totalCommissionIn >= 1000000000000000000 ? (totalCommissionIn / 1000000000000000000)?.toLocaleString() : totalCommissionIn?.toLocaleString()) : 0}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>{totalCommissionOut ? (totalCommissionOut >= 1000000000000000000 ? (totalCommissionOut / 1000000000000000000)?.toLocaleString() : totalCommissionOut?.toLocaleString()) : 0}</span>
                    </DataTableRow>

                </DataTableItem>

                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <span>Transaction Fee</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>{totalFeeIn ? (totalFeeIn >= 1000000000000000000 ? (totalFeeIn / 1000000000000000000)?.toLocaleString() : totalFeeIn?.toLocaleString()) : 0}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <span>{totalFeeOut ? (totalFeeOut >= 1000000000000000000 ? (totalFeeOut / 1000000000000000000)?.toLocaleString() : totalFeeOut?.toLocaleString()) : 0} BNB</span>

                    </DataTableRow>

                </DataTableItem>

            </div>
        </React.Fragment>
    );
};
export default TransactionTable;
