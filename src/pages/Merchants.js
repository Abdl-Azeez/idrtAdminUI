import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { Add, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import Content from "../layout/content/Content.js";
import Head from "../layout/head/Head";
import {
    Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PaginationComponent,
} from "../components/Component";
import moment from "moment";
import { Card } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { merchantData } from "../components/table/TableData.js";

const Merchants = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const dispatch = useDispatch();
    const theme = createTheme();
    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Agent Name', field: 'agentName' },
        { title: 'YTD Commission', field: 'ytd_commission' },
        { title: 'MTD Txns', field: 'mtd_txns' },
        { title: 'Total Incoming Txn', field: 'total_incoming_txn' },
        { title: 'Unsettled Balance', field: 'unsettled_balance' },
        { title: 'Wallet', field: 'wallet_for_settlement' },
        {
            title: 'Actions',
            render: (rowData) => (
                <div className="d-flex flex-column mx-auto " style={{ width: '200px', gap: '10px' }}>
                    <Button className="btn btn-small btn-outline-primary" onClick={() => handleButtonClick(rowData, 'Manual Settlement')}>
                        <span>Manual Settlement</span>
                    </Button>
                    <Button className="btn btn-small btn-outline-secondary px-1" style={{ fontSize: "12px" }} onClick={() => handleButtonClick(rowData, 'Edit Settlement Wallet Address')}>
                        <span>Edit Settlement Wallet Address</span>
                    </Button>
                    <Button className="btn btn-small btn-outline-info" onClick={() => handleButtonClick(rowData, 'Reset Password')}>
                        <span>Reset Password</span>
                    </Button>
                </div>
            ),
        },
    ];

    const handleButtonClick = (rowData, actionTooltip) => {
        // Handle button clicks here
        alert(`Button clicked for ${rowData.name}: ${actionTooltip}`);
    };

    return (
        <React.Fragment>
            <Head title="Merchants"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">Merchants</BlockTitle>

                        </BlockHeadContent>
                        <BlockHeadContent>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <div className="p-0">
                        <ThemeProvider theme={theme}>
                            <MaterialTable
                                title="Merchants"
                                columns={columns}
                                data={merchantData.data}
                                options={{
                                    filtering: true,
                                    pagination: true,
                                    paginationType: 'stepped',
                                    pageSize: 10,
                                    sorting: true,
                                    search: false,
                                    toolbar: false
                                }}
                                icons={{
                                    Add: Add,
                                    Check: Check,
                                    Clear: Clear,
                                    Delete: DeleteOutline,
                                    DetailPanel: ChevronRight,
                                    Edit: Edit,
                                    Export: SaveAlt,
                                    Filter: FilterList,
                                    FirstPage: FirstPage,
                                    LastPage: LastPage,
                                    NextPage: ChevronRight,
                                    PreviousPage: ChevronLeft,
                                    ResetSearch: Clear,
                                    Search: Search,
                                    SortArrow: ArrowDownward,
                                    ThirdStateCheck: Remove,
                                    ViewColumn: ViewColumn,
                                }}
                            />
                        </ThemeProvider>
                    </div>
                </Block>
            </Content>
        </React.Fragment>
    );
};

export default Merchants;
