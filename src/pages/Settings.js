import React from "react";
import { Button, FormGroup } from "reactstrap";
import {
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Col,
    PreviewAltCard,
    Row,
} from "../components/Component";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";

const Settings = () => {
    return (
        <React.Fragment>
            <Head title="Settings"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockHeadContent>
                        <BlockTitle page>Settings</BlockTitle>
                    </BlockHeadContent>
                </BlockHead>

                <Block>
                    <Col md={7}>
                        <PreviewAltCard>
                            {/* <h5 className="card-title">Web Store Setting</h5>
                        <p>Here is your basic store setting of your website.</p> */}

                            <form className="gy-3 form-settings">
                                <Row className="g-3 align-center">
                                    <Col lg="5">
                                        <FormGroup>
                                            <label className="form-label" htmlFor="site-name">
                                                Name
                                            </label>
                                            {/* <span className="form-note">Specify the name of your website.</span> */}
                                        </FormGroup>
                                    </Col>
                                    <Col lg="7">
                                        <FormGroup>
                                            <div className="form-control-wrap">
                                                <input type="text" className="form-control" id="site-name" defaultValue="Merchant J" />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="g-3">
                                    <Col lg="5" className="offset-lg-5">
                                        <FormGroup className="mt-2">
                                            <Button size="lg" color="primary" type="submit">
                                                Update
                                            </Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </form>
                        </PreviewAltCard>
                    </Col>
                </Block>
            </Content>
        </React.Fragment>
    );
};
export default Settings;
