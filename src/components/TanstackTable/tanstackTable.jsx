import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { BiCaretUp } from "react-icons/bi";
// import TableData from "./TableData/FakeTableData"; // Assuming you have a JSON file with your data
import SearchBar from "../../components/SearchBar/SearchBar";

const TanstackTable = ({
  title = "Table",
  data = [],
  columns = [],
  defaultPageSize = {},
  pageSizeOptions = [],
  showSearch = true,
  specialSortColumns = [],
  //   onRowClick,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState([]);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting: sort,
      pagination,
      globalFilter: filter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setFilter,
    onSortingChange: setSort,
  });

  return (
    <div className="p-5 bg-gray-100 mx-auto max-w-7xl rounded-lg shadow-md mt-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold ">{title}</h1> {/*Tanstack Table */}
          <select
            value={pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-white-default px-5 py-3 border border-solid border-black-100"
          >
            {pageSizeOptions.map((pageSize) => (
              <option value={pageSize} key={pageSize}>
                Rows Per Page {pageSize}
              </option>
            ))}
          </select>
        </div>
        {showSearch && (
          <SearchBar
            icon={false}
            placeholder="Search"
            className="bg-white-default px-5 py-3 border border-solid border-black-100"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        )}
      </div>
      <div>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-between">
                      {header.column.columnDef.header}
                      {specialSortColumns.includes(header.id) && (
                        <span>
                          <BiCaretUp
                            size={14}
                            className={
                              header.column.getIsSorted() === "asc"
                                ? "text-black"
                                : "text-gray-400"
                            }
                          />
                          <BiCaretDown
                            size={14}
                            className={
                              header.column.getIsSorted() === "desc"
                                ? "text-black"
                                : "text-gray-400"
                            }
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-4 py-2">
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold">
            Showing {pagination.pageSize * pagination.pageIndex + 1} to{" "}
            {Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              data.length
            )}{" "}
            of {data.length} entries
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="capitalize bg-blue-800 font-semibold text-white hover:bg-blend-multiply px-3.5 py-2 rounded-lg"
          >
            previous
          </button>
          {Array.from({ length: table.getPageCount() }).map((_, index) => (
            <button
              key={index}
              onClick={() => table.setPageIndex(index)}
              className={`px-3.5 py-2 rounded-lg ${
                index === table.getState().pagination.pageIndex
                  ? "bg-blue-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="capitalize bg-blue-800 font-semibold text-white hover:bg-blend-multiply px-3.5 py-2 rounded-lg"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TanstackTable;
