import React, { useState, useEffect } from "react";
import {
    Alert,
} from "reactstrap";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage } from '@mui/icons-material';
import {
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Block,
    BlockDes,
} from "../../../Component";
import { fetchIncomingTnx, errorChecker } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Content from "../../../../layout/content/Content";


const IncomingTnx = ({ role }) => {
    const { incomingTnx, transactionError } = useSelector((state) => state.Transaction);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIncomingTnx({ page: currentPage, perPage: itemPerPage }));
    }, [dispatch, itemPerPage]);

    const theme = createTheme();
    const columns = [
        { title: 'User', field: 'username' },
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
        { title: 'From Wallet', field: 'fromAddress' },
        { title: 'To Wallet', field: 'walletId' },
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
        { title: 'Orphan Txn', field: 'isOrphanTxn' },
    ];

    const merchantColumns = [
        { title: 'ID', field: 'id' },
        { title: 'User Name', field: 'username' },
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
        { title: 'From Wallet', field: 'fromAddress' },
        { title: 'To Wallet', field: 'walletId' },

        {
            title: 'Amount',
            field: 'amount',
            render: rowData => <span>{Number(rowData.amount / 100).toLocaleString()}</span>,
        },
        { title: 'Currency', field: 'currencySymbol' },
        { title: 'Orphan Txn', field: 'isOrphanTxn' },
    ];
    const agentColumns = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'username' },
        { title: 'User ID', field: 'txnHash' },
        {
            title: 'Date / Time',
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
            title: 'Amount',
            field: 'amount',
            render: rowData => <span>{Number(rowData.amount / 100).toLocaleString()}</span>,
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

    return (
        <React.Fragment>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            {role !== "AGENT" ? <BlockTitle tag="h2" className="fw-normal">Transactions</BlockTitle>
                                : <BlockDes className="text-soft">
                                    <p>You have {incomingTnx?.totalItems} {`${role === "AGENT" ? "Merchants Incoming Transactions" : "Incoming Transactions"}`}.</p>
                                </BlockDes>
                            }
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    {role !== "AGENT" && transactionError ?
                        <Alert color="danger">
                            Transaction API Error: {transactionError}
                        </Alert> : null
                    }
                    {incomingTnx?.data &&
                        <div className="p-0">
                            <ThemeProvider theme={theme}>
                                <MaterialTable
                                    title={`${role === "AGENT" ? "Merchants Incoming Transactions" : "Incoming Transactions"}`}
                                    columns={role === "AGENT" ? agentColumns : role === "MERCHANT" ? merchantColumns : columns}
                                    data={query =>
                                        new Promise((resolve, reject) => {
                                            let url = `${process.env.REACT_APP_BASE_URL}/transactions/incoming?`
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

export default IncomingTnx;
