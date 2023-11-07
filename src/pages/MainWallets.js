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

const MainWallets = () => {
    return (
        <React.Fragment>
            <Head title="Main Wallets" />
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BlockTitle tag="h2" className="fw-normal">
                            Main Wallets
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
export default MainWallets;
