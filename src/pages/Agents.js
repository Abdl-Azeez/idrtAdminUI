import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { createTheme, ThemeProvider } from '@mui/material';
import { Add, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';
import Content from "../layout/content/Content.js";
import Head from "../layout/head/Head.js";
import {
    Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    PaginationComponent,
} from "../components/Component.js";
import { agentData } from "../components/table/TableData.js";

const Agents = () => {
    const [data, setData] = useState(agentData.data);

    const theme = createTheme();
    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Wallet', field: 'wallet_id' },
        { title: 'Balance', field: 'balance' },
        { title: 'No of Merchants', field: 'no_of_merchants' },
        { title: 'Total Commission', field: 'total_commission' },
        { title: 'Active', field: 'active', type: 'boolean' },
        { title: 'Location', field: 'location' },
    ];


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
                                title="Merchants"
                                columns={columns}
                                data={data}
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

export default Agents;
