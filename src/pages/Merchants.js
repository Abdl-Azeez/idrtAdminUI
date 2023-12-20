import React, { useState } from "react";
import MaterialTable from "material-table";
import { createTheme, ThemeProvider } from "@mui/material";
import { ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage } from "@mui/icons-material";
import Content from "../layout/content/Content.js";
import Head from "../layout/head/Head";
import { Alert, Card } from "reactstrap";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Button, Col, PreviewAltCard, Row } from "../components/Component";
import { useDispatch } from "react-redux";
import { merchantDataForAdmin, merchantDataForAgent } from "../components/table/TableData.js";
import TransactionTable from "../components/partials/analytics/dashboard-transaction/TransactionTable.js";
import Transaction from "../components/partials/analytics/dashboard-transaction/Transaction.js";
import Fees from "../components/partials/analytics/dashboard-transaction/Fees.js";
import MerchantTrends from "../components/partials/analytics/dashboard-transaction/MerchantTrends.js";

const Merchants = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [selectedRow, setSelectedRow] = useState(null);
    const dispatch = useDispatch();
    let role = localStorage.getItem("idrtRole") ? JSON.parse(localStorage.getItem("idrtRole")) : null;
    const theme = createTheme();
    const columns = [
        { title: "ID", field: "id" },
        { title: "Name", field: "name" },
        { title: "Agent Name", field: "agentName" },
        { title: "YTD Commission", field: "ytd_commission" },
        { title: "MTD Txns", field: "mtd_txns" },
        { title: "Total Incoming Txn", field: "total_incoming_txn" },
        { title: "Unsettled Balance", field: "unsettled_balance" },
        { title: "Wallet", field: "wallet_for_settlement" },
        {
            title: "Actions",
            render: (rowData) => (
                <div className="d-flex flex-column mx-auto " style={{ width: "200px", gap: "10px" }}>
                    <Button
                        className="btn btn-small btn-outline-primary"
                        onClick={() => handleButtonClick(rowData, "Manual Settlement")}
                    >
                        <span>Manual Settlement</span>
                    </Button>
                    <Button
                        className="btn btn-small btn-outline-secondary px-1"
                        style={{ fontSize: "12px" }}
                        onClick={() => handleButtonClick(rowData, "Edit Settlement Wallet Address")}
                    >
                        <span>Edit Settlement Wallet Address</span>
                    </Button>
                    <Button
                        className="btn btn-small btn-outline-info"
                        onClick={() => handleButtonClick(rowData, "Reset Password")}
                    >
                        <span>Reset Password</span>
                    </Button>
                </div>
            ),
        },
    ];
    const agentColumns = [
        {
            title: "ID",
            field: "id",
            render: rowData => <div>Mer{rowData.id}</div>,
        },
        { title: "Name", field: "name" },
        {
            title: "Total Deposit",
            field: "totalDeposit",
            render: rowData => <div>${rowData.totalDeposit}</div>,
        },
        { title: "Total # of Txn", field: "totalNumberOfTxn" },
        {
            title: "Total Commission",
            field: "totalCommission",
            render: rowData => <div>${rowData.totalCommission}</div>,
        },
        {
            title: "Avg Daily Deposit",
            field: "averageDailyDepositAmount",
            render: rowData => <div>${rowData.averageDailyDepositAmount}</div>,
        },
        {
            title: "Deposit Unsettled",
            field: "depositAmountUnsettled",
            render: rowData => <div>${rowData.depositAmountUnsettled}</div>,
        },
        {
            title: "Commission %",
            field: "commissionPercentage",
            render: rowData => <div>{rowData.commissionPercentage}%</div>,
        },
    ];

    const handleButtonClick = (rowData, actionTooltip) => {
        // Handle button clicks here
        alert(`Button clicked for ${rowData.name}: ${actionTooltip}`);
    };

    const handleRowClick = (evt, selectedRow) => {
        console.log(selectedRow)
        setSelectedRow(selectedRow);
    };


    const filteredTransactions = [
        {
            inAmount: "16580000000", inCommission: "267750000", inCount: "137", inGasFee: "0", outAmount: "22100000000", outCommission: "0", outCount: "80", outGasFee: "48318805871369866", transactionDate: "20231121"
        },

        {
            inAmount: "18090000000", inCommission: "292500000", inCount: "145", inGasFee: "0", outAmount: "17550000000", outCommission: "0", outCount: "65", outGasFee: "39291098883515326", transactionDate: "20231122"
        },

        {
            inAmount: "5070000000", inCommission: "82800000", inCount: "43", inGasFee: "0", outAmount: "4490000000", outCommission: "0", outCount: "17", outGasFee: "10020402396205440", transactionDate: "20231123"
        }
    ]
    const dateRange = () => {

        return 'this year'

    }
    return (
        <React.Fragment>
            <Head title="Merchants"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">
                                Merchants
                            </BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent></BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <div className="p-0">
                        <ThemeProvider theme={theme}>

                            <MaterialTable
                                title="Merchants"
                                columns={role === "ADMIN" ? columns : agentColumns}
                                data={role === "ADMIN" ? merchantDataForAdmin.data : merchantDataForAgent.data}
                                options={{
                                    filtering: true,
                                    pagination: true,
                                    // paginationType: "stepped",
                                    pageSize: 10,
                                    sorting: true,
                                    search: false,
                                    toolbar: false,
                                    rowStyle: rowData => ({
                                        color: selectedRow?.tableData?.id === rowData.tableData.id ? '#09c2de' : 'inherit',
                                        fontWeight: selectedRow?.tableData?.id === rowData.tableData.id ? 'bold' : 'inherit',
                                    }),
                                }}
                                icons={{
                                    Filter: FilterList,
                                    FirstPage: FirstPage,
                                    LastPage: LastPage,
                                    NextPage: ChevronRight,
                                    PreviousPage: ChevronLeft,
                                    SortArrow: ArrowDownward,
                                    DetailPanel: ChevronRight,
                                }}
                                onRowClick={(evt, rowData) => handleRowClick(evt, rowData)}
                            // detailPanel={rowData => {
                            //     return (
                            //         <div className="mb-5 px-5 pt-3">
                            //             <BlockHeadContent>
                            //                 <BlockTitle page tag="h3">
                            //                     Trend Analysis
                            //                 </BlockTitle>
                            //                 <h5>Merchant: Mer{rowData?.id}</h5>
                            //             </BlockHeadContent>

                            //             <Row className="g-gs py-4">
                            //                 <Col md="12" lg="12" xxl="12">

                            //                     <MerchantTrends dateRange={dateRange} data={filteredTransactions} />
                            //                     <Row className="d-flex justify-content-between p-3">
                            //                         <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow" style={{ width: '49%' }}>
                            //                             <p style={{ fontSize: '20px' }}>Avg Daily Deposit</p>
                            //                             <h5 className="w-80 text-dark">{rowData?.averageDailyDepositAmount}</h5>
                            //                         </Card>
                            //                         <Card className="text-center px-3 py-4 justify-content-center mt-0 align-items-center shadow" style={{ width: '49%' }}>
                            //                             <p style={{ fontSize: '20px' }}>Total # of Transactions</p>
                            //                             <h5 className="w-80 text-dark">{rowData?.totalNumberOfTxn}</h5>
                            //                         </Card>

                            //                     </Row>
                            //                 </Col>
                            //             </Row>


                            //         </div>
                            //     )
                            // }}
                            />

                        </ThemeProvider>
                    </div>
                </Block>
                <hr className="mx-4" />
                {selectedRow &&
                    <div className="mb-5 px-5 pt-3">
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Trend Analysis
                            </BlockTitle>
                            <h5>Merchant: Mer{selectedRow?.id}</h5>
                        </BlockHeadContent>

                        <Row className="g-gs py-4">
                            <Col md="12" lg="12" xxl="12">

                                <MerchantTrends dateRange={dateRange} data={filteredTransactions} />
                                <Row className="d-flex justify-content-between p-3">
                                    <Card className="text-center px-3 py-4 justify-content-center align-items-center shadow" style={{ width: '49%' }}>
                                        <p style={{ fontSize: '20px' }}>Avg Daily Deposit</p>
                                        <h5 className="w-80 text-dark">{selectedRow?.averageDailyDepositAmount}</h5>
                                    </Card>
                                    <Card className="text-center px-3 py-4 justify-content-center mt-0 align-items-center shadow" style={{ width: '49%' }}>
                                        <p style={{ fontSize: '20px' }}>Total # of Transactions</p>
                                        <h5 className="w-80 text-dark">{selectedRow?.totalNumberOfTxn}</h5>
                                    </Card>

                                </Row>
                            </Col>
                        </Row>


                    </div>
                }
            </Content>
        </React.Fragment>
    );
};

export default Merchants;
