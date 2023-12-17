import React, { useState, useEffect } from "react";
import Content from "../layout/content/Content.js";
import Head from "../layout/head/Head";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { ArrowDownward, ChevronLeft, ChevronRight, FilterList, FirstPage, LastPage } from '@mui/icons-material';
import {
    Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    PaginationComponent,
} from "../components/Component";
import moment from "moment";
import { Alert, Card } from "reactstrap";
import { fetchOrphanLog } from "../store/actions.js";
import { useSelector, useDispatch } from "react-redux";

const OrphanLog = () => {
    const { orphanLog, transactionError } = useSelector((state) => state.Transaction);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();
    const theme = createTheme();
    const columns = [
        { title: 'ID', field: 'id' },
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
        { title: 'User ID', field: 'userId' },
    ]


    // Changing state value when searching name
    useEffect(() => {
        dispatch(fetchOrphanLog())
    }, []);


    return (
        <React.Fragment>
            <Head title="Orphan Log"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">Orphan Log</BlockTitle>
                            {/* <BlockDes className="text-soft">
                                <p>You have {orphanLog?.length} Orphan Logs.</p>
                            </BlockDes> */}
                        </BlockHeadContent>
                        <BlockHeadContent>

                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <div className="d-flex flex-column">
                        {transactionError &&
                            <Alert color="danger">
                                Orphan API Error: {transactionError}
                            </Alert>
                        }
                    </div>
                    {orphanLog &&
                        <div className="p-0">
                            <ThemeProvider theme={theme}>
                                <MaterialTable
                                    title="Orphan Log"
                                    columns={columns}
                                    data={orphanLog}
                                    options={{
                                        filtering: true,
                                        pagination: true,
                                        // paginationType: 'stepped',
                                        pageSize: 10,
                                        sorting: true,
                                        search: false,
                                        toolbar: false
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
                        </div>}
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default OrphanLog;
