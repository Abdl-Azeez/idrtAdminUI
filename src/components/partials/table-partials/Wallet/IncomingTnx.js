import React, { useState, useEffect } from "react";
import Content from "../../../../layout/content/Content.js";
import Head from "../../../../layout/head/Head.js";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage } from '@mui/icons-material';
import {
    Block,
    PaginationComponent,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
} from "../../../Component.js";
import moment from "moment";
import { Alert, Button, Card } from "reactstrap";
import { fetchTransactionAddressError, fetchWalletBalance, fetchWalletBalanceError, fetchTransactionAddress } from "../../../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";


const IncomingWalletTnx = ({ updateAddress }) => {
    const { transactionAddress, transactionError } = useSelector((state) => state.Transaction);
    const { walletBalance, walletBalanceError } = useSelector((state) => state.Wallet);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [walletAddress, setAddress] = useState("0x0001");
    const dispatch = useDispatch();

    // Changing state value when searching name
    useEffect(() => {
        if (walletAddress) {
            dispatch(fetchTransactionAddress({
                walletAddress,
                page: currentPage, perPage: itemPerPage,
                type: 'in'
            }));
            dispatch(fetchWalletBalance(walletAddress));
        }
    }, [walletAddress, currentPage]);

    useEffect(() => {
        dispatch(fetchTransactionAddressError());
    }, []);


    useEffect(() => {
        if (walletBalanceError) {
            setTimeout(() => {
                dispatch(fetchWalletBalanceError());
            }, 2000);
        }
    }, [walletBalanceError]);

    const theme = createTheme();
    const columns = [
        { title: 'User', field: 'username' },
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
    ];
    return (
        <React.Fragment>
            <BlockHead size="sm">
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h2" className="fw-normal">Wallets</BlockTitle>
                        <BlockDes>
                            <p className="lead">
                                <strong>Balance: {walletBalance ? walletBalance[0]?.balance / 100 : 0}</strong>
                            </p>
                        </BlockDes>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
            <Block>
                <div className="d-flex flex-column mb-3">
                    {transactionError &&
                        <Alert color="danger">
                            Transaction API Error: {transactionError}
                        </Alert>
                    }
                    {walletBalanceError &&
                        <Alert color="danger">
                            Wallet Balance API Error: {walletBalanceError}
                        </Alert>
                    }
                </div>
                {transactionAddress?.data &&
                    <div className="p-0">
                        <ThemeProvider theme={theme}>
                            <MaterialTable
                                title="Incoming Transactions"
                                columns={columns}
                                data={query =>
                                    new Promise((resolve, reject) => {
                                        let url = `${process.env.REACT_APP_BASE_URL}/transactions/incomingByWallet/${walletAddress}?`
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
        </React.Fragment>
    );
};

export default IncomingWalletTnx;
