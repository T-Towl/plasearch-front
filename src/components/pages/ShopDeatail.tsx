import React from "react";
import { useParams } from "react-router-dom";

function ShopDetails() {
  const { id } = useParams();
  return (
    <>
      <p>post: {id}</p>
    </>
  );
}

export default ShopDetails;
