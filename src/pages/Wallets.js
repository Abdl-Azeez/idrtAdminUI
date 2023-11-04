import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
    SpecialTable,
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    BlockDes,
    BackTo,
    OrderTable,
    LoginLogTable,
} from "../components/Component";
import { Card } from "reactstrap";

const Wallets = () => {
    return (
        <React.Fragment>
            <Head title="Special table" />
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>

                        <BlockTitle tag="h2" className="fw-normal">
                            Wallet Table
                        </BlockTitle>

                    </BlockHeadContent>
                </BlockHead>

                <Block size="lg">
                    {/* <BlockHead>
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Transaction List - With Action</BlockTitle>
                            <p>
                                The following table can be use for <strong className="text-primary">invoice, payment history</strong>{" "}
                                related transaction.
                            </p>
                        </BlockHeadContent>
                    </BlockHead> */}
                    <Card className="card-bordered card-preview">
                        <SpecialTable action={true} />
                    </Card>
                </Block>


            </Content>
        </React.Fragment>
    );
};
export default Wallets;
