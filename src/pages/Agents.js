import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { Add, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import Content from "../layout/content/Content.js";
import Head from "../layout/head/Head.js";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
} from "../components/Component.js";
import { agentData } from "../components/table/TableData.js";

const Agents = () => {
    const theme = createTheme();
    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'No of Merchants', field: 'no_of_merchants' },
        { title: 'YTD Commission', field: 'ytd_commission' },
        { title: 'Unclaimed Commission', field: 'unclaimed_commission' },
        { title: 'MTD Volume', field: 'mtd_volume' },
        { title: 'Wallet Address', field: 'wallet_address' },
        {
            title: 'Actions',
            render: (rowData) => (
                <div className="d-flex flex-column mx-auto " style={{ width: '200px', gap: '10px' }}>
                    <Button className="btn btn-small btn-outline-primary" onClick={() => handleButtonClick(rowData, 'Manual Withdraw')}>
                        <span>Manual Withdraw</span>
                    </Button>
                    <Button className="btn btn-small btn-outline-secondary" onClick={() => handleButtonClick(rowData, 'Edit Wallet Address')}>
                        <span>Edit Wallet Address</span>
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
    const getColorForAction = (actionTooltip) => {
        switch (actionTooltip) {
            case 'Manual Settlement':
                return 'primary';
            case 'Edit Settlement Wallet Address':
                return 'secondary';
            case 'Reset Password':
                return 'danger';
            default:
                return 'default';
        }
    };

    const getTextForAction = (actionTooltip) => {
        switch (actionTooltip) {
            case 'Manual Settlement':
                return 'Manual Settlement';
            case 'Edit Settlement Wallet Address':
                return 'Edit Wallet Address';
            case 'Reset Password':
                return 'Reset Password';
            default:
                return 'Default Action';
        }
    };
    return (
        <React.Fragment>
            <Head title="Agents"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h2" className="fw-normal">Agents</BlockTitle>
                        </BlockHeadContent>
                        <BlockHeadContent>

                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>

                <Block>
                    <div className="p-0">
                        <ThemeProvider theme={theme}>
                            <MaterialTable
                                title="Agents"
                                columns={columns}
                                data={agentData.data}
                                options={{
                                    filtering: true,
                                    pagination: true,
                                    paginationType: 'stepped',
                                    pageSize: 10,
                                    sorting: true,
                                    search: false,
                                    toolbar: false,
                                    actionsColumnIndex: -1
                                }}
                                // actions={[
                                //     {
                                //         icon: 'button',
                                //         tooltip: 'Manual Settlement',
                                //         onClick: (event, rowData) => alert("Manual Settlement for " + rowData.name),

                                //     },
                                //     {
                                //         icon: 'button',
                                //         tooltip: 'Edit Settlement Wallet Address',
                                //         onClick: (event, rowData) => alert("Edit Settlement Wallet Address for " + rowData.name),

                                //     },
                                //     {
                                //         icon: 'button',
                                //         tooltip: 'Reset Password',
                                //         onClick: (event, rowData) => alert("Reset Password for " + rowData.name),

                                //     },
                                // ]}
                                // components={{
                                //     Action: props => (
                                //         // <div style={{ display: 'flex', flexDirection: 'column' }}>
                                //         <Button
                                //             onClick={(event) => props.action.onClick(event, props.data)}
                                //             color={getColorForAction(props.action.tooltip)}
                                //             variant="contained"
                                //             style={{ textTransform: 'none', marginBottom: '5px' }}
                                //             size="small"
                                //         >
                                //             {getTextForAction(props.action.tooltip)}
                                //         </Button>
                                //         // </div>
                                //     ),
                                // }}
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

export default Agents;
