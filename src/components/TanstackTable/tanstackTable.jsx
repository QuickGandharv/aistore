import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { BiCaretUp } from "react-icons/bi";
// import TableData from "./TableData/FakeTableData"; // Assuming you have a JSON file with your data
import SearchBar from "../../components/SearchBar/SearchBar";
import { FaSortAmountDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import IconsButton from "../Buttons/iconsButton";
import { RiRefreshLine } from "react-icons/ri";
import { BsCalendar2Check } from "react-icons/bs";
import { format } from "date-fns";
import Button from "../Buttons/defaultButton";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { enUS } from "date-fns/locale";
import { FiFilter } from "react-icons/fi";

const TanstackTable = ({
  title = "Table",
  data = [],
  columns = [],
  defaultPageSize = {},
  pageSizeOptions = [],
  showSearch = true,
  specialSortColumns = [],
  showColumn = true,
  refreshButton = true,
  showDate = true,
  statusFilter = true,
  statusValue = [],
  //   onRowClick,
}) => {
  const ApplciationData = data;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState([]);

  const [showRangeDate, setShowRangeDate] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const byDefaultRangeDate = [
    {
      startDate: new Date("2025-01-01"),
      // "2025-01-01"
      endDate: new Date(),
      key: "selection",
    },
  ];

  const [state, setState] = useState(byDefaultRangeDate);

  const filteredData = useMemo(() => {
    if (!ApplciationData) return [];

    const startDate = state[0].startDate;
    const endDate = state[0].endDate;

    return ApplciationData.filter((app) => {
      const appDate = new Date(app.created_at);
      if (isNaN(appDate)) return false; // <-- avoid bad dates

      const isWithinDateRange = appDate >= startDate && appDate <= endDate;
      const isStatusMatch =
        selectedStatuses.length === 0 || selectedStatuses.includes(app.status);

      return isWithinDateRange && isStatusMatch;
    });
  }, [ApplciationData, selectedStatuses, state]);

  const formattedDateRange = `${format(
    state[0].startDate,
    "MM/dd/yyyy"
  )} - ${format(state[0].endDate, "MM/dd/yyyy")}`;

  // const statuses = [
  //   "draft",
  //   "submitted",
  //   "changes_requested",
  //   "completed",
  //   "cancelled",
  // ];

  const table = useReactTable({
    columns,
    data: filteredData,
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

  const resetFiltersAndSettings = () => {
    // Reset pagination
    setPagination({
      pageIndex: 0,
      pageSize: defaultPageSize,
    });

    // Reset sorting
    setSort([]);

    // Reset global filter
    setFilter("");

    // Reset selected statuses
    setSelectedStatuses([]);

    // Reset column visibility
    table.getAllColumns().forEach((column) => {
      if (column.getCanHide()) {
        column.toggleVisibility(true);
      }
    });
  };

  const renderPaginationButtons = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;
    const pages = [];

    // Always show first page
    pages.push(0);

    // Show ellipsis after first page if current is beyond second page
    if (currentPage > 2) {
      pages.push("start-ellipsis");
    }

    // Show dynamic middle pages
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show ellipsis before last page if current is far from end
    if (currentPage < totalPages - 3) {
      pages.push("end-ellipsis");
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages - 1);
    }

    // Render pagination buttons
    return pages.map((page, idx) => {
      if (page === "start-ellipsis" || page === "end-ellipsis") {
        return (
          <span
            key={page + idx}
            className="px-2 text-lg font-bold text-gray-400"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => table.setPageIndex(page)}
          className={`w-10 h-10 rounded-full ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page + 1}
        </button>
      );
    });
  };
  console.log("filteredData:", filteredData);
  return (
    <div className="p-5 bg-gray-100 mx-auto max-w-7xl rounded-lg shadow-md mt-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold ">{title}</h1>
        </div>

        <div className="flex items-center gap-2.5">
          {refreshButton && (
            <IconsButton
              classname="bg-white shadow-md"
              icon={
                <RiRefreshLine
                  className="text-black-300"
                  size={20}
                  onClick={resetFiltersAndSettings}
                />
              }
            />
          )}
          {showDate && (
            <div className="relative">
              <div
                className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white cursor-pointer"
                onClick={() => setShowRangeDate(!showRangeDate)}
              >
                <BsCalendar2Check className="text-black mr-2" size={15} />
                <span className="text-black capitalize text-base font-normal">
                  {formattedDateRange}
                </span>
                <IoIosArrowDown
                  className={`text-black ml-2 ease-linear duration-300 ${
                    showRangeDate ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              <div
                className={`flex flex-col items-end text-black absolute w-max top-12 right-0 bg-white shadow-md rounded-md z-50 p-2 ease-linear duration-300
                              ${
                                showRangeDate
                                  ? "visible opacity-100 translate-y-0"
                                  : "invisible opacity-0 translate-y-[30px]"
                              }`}
              >
                <DateRangePicker
                  onChange={(item) => setState([item.selection])}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                  locale={enUS}
                />
                <Button
                  classname="[&]:rounded-full [&]:py-2"
                  text="Apply"
                  onclick={() => setShowRangeDate(!showRangeDate)}
                />
              </div>
            </div>
          )}

          {statusFilter && (
            <div className="relative group">
              <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white cursor-pointer">
                <FiFilter className="text-black mr-2" size={18} />
                <span className="text-black text-base font-normal">Status</span>
                <IoIosArrowDown
                  className={`text-black ml-2 ease-linear duration-300 group-hover:rotate-180`}
                />
              </div>
              <div
                className={`absolute top-12 right-0 bg-white shadow-md rounded-md z-50 ease-linear duration-300 invisible opacity-0 translate-y-[30px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
              >
                {statusValue.map((status) => {
                  return (
                    <label
                      key={status}
                      className="flex items-center gap-x-2 py-2 px-2.5 cursor-pointer hover:bg-green-50"
                    >
                      <input
                        className="w-auto sr-only peer"
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                      />
                      <div
                        className="peer-checked:bg-green-700 bg-transparent w-[18px] h-[18px] border border-solid border-black rounded relative
                                              after:content-['] after:absolute after:top-[3px] after:left-1.5 after:w-1 after:h-2 after:border-r peer-checked:border-green-700
                                              after:border-b after:border-solid after:border-white after:rotate-45"
                      ></div>

                      <span className="text-black capitalize text-base font-medium">
                        {status}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
          {showColumn && (
            <div className="relative group">
              <div
                className={`flex items-center justify-center px-5 py-2.5 rounded-full bg-white cursor-pointer shadow-md`}
              >
                <FaSortAmountDown className="text-black mr-2" />
                <span className="text-black capitalize text-base font-normal">
                  Columns
                </span>
                <IoIosArrowDown
                  className={`text-black ml-2 ease-linear duration-300 group-hover:rotate-180`}
                />
              </div>
              <div
                className={`flex flex-col w-48 bg-white absolute shadow-md top-12 right-0 rounded-md z-50 ease-linear duration-300 border border-solid border-black invisible opacity-0 translate-y-[30px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
              >
                {table.getAllColumns().map((column) => (
                  <label
                    key={column.id}
                    className="flex items-center gap-x-2 py-2 px-2.5 cursor-pointer hover:bg-green-50"
                  >
                    <input
                      className="sr-only peer"
                      type="checkbox"
                      checked={column.getIsVisible()}
                      disabled={!column.getCanHide}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                    <div className="peer-checked:bg-green-700 bg-transparent w-[18px] h-[18px] border border-solid border-gray-500 rounded relative after:content-['] after:absolute after:top-[3px] after:left-1.5 after:w-1 after:h-2 after:border-r peer-checked:border-green-700 after:border-b after:border-solid after:border-white after:rotate-45"></div>
                    <span className="text-black capitalize text-base font-medium">
                      {column.columnDef.header}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
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
            className="capitalize bg-blue-800 font-semibold text-white hover:bg-blend-multiply px-3.5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            previous
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="capitalize bg-blue-800 font-semibold text-white hover:bg-blend-multiply px-3.5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TanstackTable;
