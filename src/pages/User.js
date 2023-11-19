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

const User = () => {
    return (
        <React.Fragment>
            <Head title="User" />
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BlockTitle tag="h2" className="fw-normal">
                            User
                        </BlockTitle>
                    </BlockHeadContent>
                </BlockHead>
                <Block size="lg">
                    <PreviewCard>
                        <p>#Add two tables, remove checkbox</p>
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
export default User;
