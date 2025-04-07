import React from "react";
import TanstackTable from "./tanstackTable";
import UserData from "../TanstackTable/smapleData/FakeData.json";
import UserColumns from "../TanstackTable/smapleData/SampleColumn.jsx";

const dynamicTanstack = () => {
  return (
    <div>
      <TanstackTable
        title="Dynamic Table"
        columns={UserColumns}
        data={UserData}
        defaultPageSize={5}
        pageSizeOptions={[5, 10]}
        showSearch={false}
        specialSortColumns={["name", "city"]}
      />
    </div>
  );
};

export default dynamicTanstack;
