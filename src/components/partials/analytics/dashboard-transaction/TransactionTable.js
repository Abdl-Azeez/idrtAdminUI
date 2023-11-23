import React from "react";
import { DataTableHead, DataTableRow, DataTableItem } from "../../../Component";

const TransactionTable = ({ data }) => {
    const totalTnxIn = data?.reduce((sum, data) => {
        if (data && data.inCount) {
            return sum + Number(data.inCount);
        }
        return sum;
    }, 0);

    const totalTnxOut = data?.reduce((sum, data) => {
        if (data && data.outCount) {
            return sum + Number(data.outCount);
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
                        <div style={{ width: '350px' }}>No. of Transactions</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalTnxIn ? totalTnxIn?.toLocaleString() : 0}</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalTnxOut ? (totalTnxOut).toLocaleString() : 0}</div>
                    </DataTableRow>

                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <div>Transaction Amount (IDRT)</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalIDRT_In ? ((totalIDRT_In / 100)?.toLocaleString()) : 0}</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalIDRT_Out ? ((totalIDRT_Out / 100)?.toLocaleString()) : 0}</div>
                    </DataTableRow>

                </DataTableItem>
                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <div>Commssion (IDRT)</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalCommissionIn ? (totalCommissionIn / 100)?.toLocaleString() : 0}</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalCommissionOut ? (totalCommissionOut / 100)?.toLocaleString() : 0}</div>
                    </DataTableRow>

                </DataTableItem>

                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                        <div>Transaction Fee (BNB)</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalFeeIn ? (totalFeeIn / 1000000000000000000)?.toLocaleString() : 0}</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions">
                        <div style={{ width: '300px' }}>{totalFeeOut ? ((totalFeeOut / 1000000000000000000)?.toLocaleString()) : 0}</div>
                    </DataTableRow>

                </DataTableItem>

            </div>
        </React.Fragment>
    );
};
export default TransactionTable;
