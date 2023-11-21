import React, { useEffect, useState } from "react";
import { Alert, Button, FormGroup } from "reactstrap";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Col,
    PreviewAltCard,
    Row,
} from "../components/Component";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { fetchMerchant, updateMerchant, errorChecker, fetchMerchantError } from "../store/actions";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Settings = () => {
    const [searchText, setSearchText] = useState("");
    const [userName, setUserName] = useState(null);
    const [updatedFields, setUpdatedFields] = useState({});
    const [data, setData] = useState(null);
    const { merchant, merchantError, message } = useSelector((state) => state.Merchant);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMerchantError())
        if (userName) {
            dispatch(fetchMerchant(userName));
        }
    }, [userName, dispatch]);

    useEffect(() => {

        if (message) {
            setTimeout(() => {
                dispatch(fetchMerchant(userName));
            }, 2000);
        }
    }, [message]);

    useEffect(() => {
        if (merchantError) {
            setTimeout(() => {
                dispatch(errorChecker(merchantError));
            }, 2000);
        }
    }, [merchantError]);

    // onChange function for searching name
    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    const handleSearch = () => {
        if (searchText !== "") {
            setUserName(searchText)
        }
    }
    const { errors, register, handleSubmit } = useForm();


    const onFormSubmit = async () => {
        if (data && Object.keys(data).length > 0) {
            // console.log(formData, data)
            dispatch(updateMerchant({ configs: data }, userName));
        }
    };

    // TODO: SEND ONLY THE UPDATED FIELD
    return (
        <React.Fragment>
            <Head title="Settings"></Head>
            <Content>
                <Col md={7}>
                    <BlockHead size="sm" width="sm">
                        {merchantError &&
                            <Alert color="danger">
                                {merchantError}
                            </Alert>
                        }

                        {message &&
                            <Alert color="success">
                                {message}
                            </Alert>
                        }

                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle page>Settings</BlockTitle>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <ul className="nk-block-tools g-3">
                                    <li>
                                        <div className="form-control-wrap d-flex align-items-center">

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="default-04"
                                                placeholder="Search User Name"
                                                style={{ width: '400px' }}
                                                onChange={(e) => onSearchChange(e)}
                                            />
                                            <Button size="sm" color="secondary" style={{ right: '0px', position: 'absolute' }} onClick={handleSearch}>
                                                Search
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                </Col>

                <Block className="pt-3">
                    {merchant && (
                        <Col md={7}>
                            <PreviewAltCard>
                                <form className="gy-3 form-settings" onSubmit={handleSubmit(onFormSubmit)}>
                                    {merchant.configs &&
                                        merchant.configs.map((config) => (
                                            <div className="g-3" key={config.id}>
                                                <Row className="g-3 align-center">
                                                    <Col lg="5">
                                                        <FormGroup>
                                                            <label className="form-label" htmlFor={config.key}>
                                                                {config.key}
                                                            </label>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="7">
                                                        <FormGroup>
                                                            <div className={`form-control-wrap `}>
                                                                <input
                                                                    type="text"
                                                                    name={config.key}
                                                                    className={`form-control ${updatedFields[config.key] ? 'updated-field' : ''}`}
                                                                    id={config.key}
                                                                    {...register(config.key)}
                                                                    defaultValue={config.value || ''}
                                                                    onChange={(e) => {
                                                                        const updatedConfigs = merchant.configs.map((c) =>
                                                                            c.key === config.key ? { ...c, value: e.target.value } : c
                                                                        );
                                                                        setData(updatedConfigs);
                                                                        setUpdatedFields((prevFields) => ({ ...prevFields, [config.key]: true }));
                                                                    }}
                                                                />
                                                                {errors[config.key] && (
                                                                    <span className="invalid">{errors[config.key].message}</span>
                                                                )}
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
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
                    )}

                </Block>
            </Content>
        </React.Fragment>
    );
};
export default Settings;
