import React, { useEffect, useState } from "react";
import { Icon, DataTableHead, DataTableRow, DataTableItem } from "../../../Component";
import { Button } from "reactstrap";

const elementsToRepeat = new Array(13).fill(null);

const OrphanTnx = () => {
    return (
        <React.Fragment>
            <div className="nk-tb-list is-loose traffic-channel-table">
                <DataTableHead className="text-center">
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        ID
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        Date
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        Time
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        From
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        To
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        Amount IDRT
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions font-weight-bolder text-dark">
                        Action
                    </DataTableRow>
                </DataTableHead>

                <DataTableItem className="nk-tb-item" >
                    <DataTableRow className="nk-tb-channel font-weight-bolder text-dark">
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions ">
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions ">
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions ">
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions ">
                    </DataTableRow>
                    <DataTableRow className="nk-tb-sessions ">
                    </DataTableRow>

                    <DataTableRow className="nk-tb-sessions">
                        <div className="d-flex justify-content-center">
                            <input type="text" />

                            <Button size="sm" color="danger">Submit</Button>
                        </div>
                    </DataTableRow>
                </DataTableItem>

            </div>
        </React.Fragment>
    );
};
export default OrphanTnx;
