import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    Card,
} from "reactstrap";
import {
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Block,
    PaginationComponent,
} from "../../../Component";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { Add, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import { fetchOutgoingTnx, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Content from "../../../../layout/content/Content";


const OutgoingTnx = ({ updatePageNumber, role }) => {
    const { outgoingTnx, transactionError } = useSelector((state) => state.Transaction);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOutgoingTnx({ page: currentPage, perPage: itemPerPage }));
    }, [dispatch, itemPerPage]);

    const theme = createTheme();
    const columns = [
        {
            title: 'Date',
            field: 'createdAt',
            render: rowData => <span className="date">
                <div className="d-flex">
                    {" "}
                    <div>{moment(rowData?.createdAt).format("DD/MM/YYYY")}</div>

                    <div className="ml-2">
                        {" "}
                        {moment(rowData?.createdAt).format("HH:mm ")}
                    </div>
                </div>
            </span>,
        },
        { title: 'Transaction Hash', field: 'txnHash' },
        { title: 'From Wallet', field: 'walletId' },
        { title: 'To Wallet', field: 'toAddress' },
        {
            title: 'Gas Fee',
            field: 'gasFee',
            render: rowData => <span>{Number(rowData?.gasFee ? rowData?.gasFee / 1000000000000000000 : 0)}</span>,
        },
        {
            title: 'Amount',
            field: 'amount',
            render: rowData => <span>{Number(rowData.amount / 100).toLocaleString()}</span>,
        },
        { title: 'Currency', field: 'currencySymbol' },
        // { title: 'Orphan Txn', field: 'isOrphanTxn' },
    ];


    const agentColumns = [
        { title: 'ID', field: 'txnHash' },
        { title: 'Name', field: 'txnHash' },
        {
            title: 'Date/Time',
            field: 'createdAt',
            render: rowData => <span className="date">
                <div className="d-flex">
                    {" "}
                    <div>{moment(rowData?.createdAt).format("DD/MM/YYYY")}</div>

                    <div className="ml-2">
                        {" "}
                        {moment(rowData?.createdAt).format("HH:mm ")}
                    </div>
                </div>
            </span>,
        },
        {
            title: 'Settlement Amount',
            field: 'amount',
            render: rowData => <span>{Number(rowData.amount / 100).toLocaleString()}</span>,
        },
        { title: 'Currency', field: 'currencySymbol' },
    ];

    const merchantColumns = [
        {
            title: 'Date/Time',
            field: 'createdAt',
            render: rowData => <span className="date">
                <div className="d-flex">
                    {" "}
                    <div>{moment(rowData?.createdAt).format("DD/MM/YYYY")}</div>

                    <div className="ml-2">
                        {" "}
                        {moment(rowData?.createdAt).format("HH:mm ")}
                    </div>
                </div>
            </span>,
        },
        { title: 'Transaction Hash', field: 'txnHash' },
        { title: 'Settlement Wallet', field: 'toAddress' },
        {
            title: 'Settlement Amount',
            field: 'amount',
            render: rowData => <span>{Number(rowData.amount / 100).toLocaleString()}</span>,
        },
        {
            title: 'Gas Fee',
            field: 'gasFee',
            render: rowData => <span>{Number(rowData?.gasFee ? rowData?.gasFee / 1000000000000000000 : 0)}</span>,
        },
        { title: 'Currency', field: 'currencySymbol' },
    ];

    useEffect(() => {
        if (transactionError) {
            setTimeout(() => {
                dispatch(errorChecker(transactionError));
            }, 2000);
        }
    }, [transactionError]);





    useEffect(() => {

        updatePageNumber(false)

    }, [currentPage, updatePageNumber]);



    return (
        <React.Fragment>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            {/* <BlockTitle page>Transactions</BlockTitle> */}
                            <BlockDes className="text-soft">
                                <p>You have {outgoingTnx?.totalItems} {`${role === "AGENT" ? "Merchant Settlement Transactions" : role === "MERCHANT" ? "Settlement Transactions" : "Outgoing Transactions"}`}.</p>
                            </BlockDes>
                        </BlockHeadContent>
                        <BlockHeadContent>

                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>

                    {outgoingTnx?.data &&
                        <div className="p-0">
                            <ThemeProvider theme={theme}>
                                <MaterialTable
                                    title={`${role === "AGENT" ? "Merchant Settlement Transactions" : role === "MERCHANT" ? "Settlement Transactions" : "Outgoing Transactions"}`}
                                    columns={role === "AGENT" ? agentColumns : role === "MERCHANT" ? merchantColumns : columns}
                                    data={query =>
                                        new Promise((resolve, reject) => {
                                            let url = `${process.env.REACT_APP_BASE_URL}/transactions/outgoing?`
                                            url += 'perPage=' + query.pageSize
                                            url += '&page=' + (query.page + 1)
                                            query.filters.forEach((filter) => {
                                                url += `&${filter.column.field}=${filter.value}`;
                                            });
                                            fetch(url)
                                                .then(response => response.json())
                                                .then(result => {
                                                    resolve({
                                                        data: result.data,
                                                        page: result.page - 1,
                                                        totalCount: result.totalItems,
                                                    })
                                                })
                                        })
                                    }
                                    options={{
                                        filtering: true,
                                        pagination: true,
                                        pageSize: itemPerPage,
                                        pageSizeOptions: [10, 25, 50, 100],
                                        // initialPage: 1,
                                        search: false
                                    }}
                                    onChangePage={(page) => { setCurrentPage(page); }}
                                    onChangeRowsPerPage={(pageSize) => {
                                        setItemPerPage(pageSize);
                                        setCurrentPage(1);
                                    }}
                                    icons={{
                                        // Add: Add,
                                        // Check: Check,
                                        // Clear: Clear,
                                        // Delete: DeleteOutline,
                                        // DetailPanel: ChevronRight,
                                        // Edit: Edit,
                                        // Export: SaveAlt,
                                        // Filter: FilterList,
                                        // FirstPage: FirstPage,
                                        // LastPage: LastPage,
                                        // NextPage: ChevronRight,
                                        // PreviousPage: ChevronLeft,
                                        // ResetSearch: Clear,
                                        // Search: Search,
                                        // SortArrow: ArrowDownward,
                                        // ThirdStateCheck: Remove,
                                        // ViewColumn: ViewColumn,

                                        Filter: FilterList,
                                        FirstPage: FirstPage,
                                        LastPage: LastPage,
                                        NextPage: ChevronRight,
                                        PreviousPage: ChevronLeft,
                                        SortArrow: ArrowDownward,
                                    }}
                                />

                            </ThemeProvider>
                        </div>
                    }
                </Block>


            </Content>
        </React.Fragment>
    );
};

export default OutgoingTnx;
