import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    PreviewCard,
    ReactDataTable,
} from "../components/Component";
import { dataTableColumns2, userData } from "./components/table/TableData";

const Users = () => {
    return (
        <React.Fragment>
            <Head title="Users" />
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BlockTitle tag="h2" className="fw-normal">
                            Users
                        </BlockTitle>
                    </BlockHeadContent>
                </BlockHead>
                <Block size="lg">
                    <PreviewCard>
                        <ReactDataTable
                            data={userData}
                            columns={dataTableColumns2}
                            pagination
                            className="nk-tb-list"
                            selectableRows
                        />
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    );
};
export default Users;
