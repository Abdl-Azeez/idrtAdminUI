import React from "react";
import { DataTableHead, DataTableRow, DataTableItem, BlockHeadContent, BlockTitle } from "../../../Component";

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
            <BlockHeadContent className="pt-5 ml-3">
                <BlockTitle page tag="h3">
                    Transaction Totals
                </BlockTitle>
            </BlockHeadContent>

            <div className="nk-tb-list is-loose traffic-channel-table">
                <DataTableHead>
                    <DataTableRow className="nk-tb-channe border-right">

                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark border-right text-center">
                        IN
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark border-right text-center">
                        OUT
                    </DataTableRow>
                </DataTableHead>

                <DataTableItem className="nk-tb-item border-right" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark border-right">
                        <div style={{ width: '350px' }}># of Transactions</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions border-right text-center">
                        <div style={{ width: '300px' }} className="mx-auto">{totalTnxIn ? totalTnxIn?.toLocaleString() : 0}</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions border-right text-center">
                        <div style={{ width: '300px' }} className="mx-auto">{totalTnxOut ? (totalTnxOut).toLocaleString() : 0}</div>
                    </DataTableRow>

                </DataTableItem>
                <DataTableItem className="nk-tb-item border-right" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark border-right">
                        <div>Txn Amount </div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions border-right text-center">
                        <div style={{ width: '300px' }} className="mx-auto">${totalIDRT_In ? ((totalIDRT_In / 100)?.toLocaleString()) : 0}</div>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions border-right text-center">
                        <div style={{ width: '300px' }} className="mx-auto">${totalIDRT_Out ? ((totalIDRT_Out / 100)?.toLocaleString()) : 0}</div>
                    </DataTableRow>

                </DataTableItem>


            </div>
        </React.Fragment>
    );
};
export default TransactionTable;
