import React from "react";
import { css } from "@emotion/react";
import RiseLoader from "react-spinners/RiseLoader";

const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

function Loader({ loading }) {
  return (
    <div className="row justify-content-around align-content-center w-100 my-5 h-100">
      <RiseLoader color={"#4DB783"} loading={loading} css={override} size={15} speedMultiplier={1} />
    </div>
  );
}

export default Loader;
