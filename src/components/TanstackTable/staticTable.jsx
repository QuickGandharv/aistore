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
import { IoIosArrowDown } from "react-icons/io";
import { FaSortAmountDown } from "react-icons/fa";

const StaticTanstackTable = ({
  title = "Table",
  data = [
    {
      user_id: "1",
      username: "jane_doe92",
      full_name: "Jane Doe",
      bio: "Living my best life 🌸 | Travel enthusiast | Coffee lover",
      profile_picture: "https://example.com/images/jane_doe.jpg",
      followers: 1204,
      following: 387,
      posts: 142,
      is_private: false,
      created_at: "2020-03-15T10:30:00Z",
    },
    {
      user_id: "2",
      username: "alex_smith88",
      full_name: "Alex Smith",
      bio: "Fitness junkie 💪 | Dog dad | #NoFilter",
      profile_picture: "https://example.com/images/alex_smith.jpg",
      followers: 850,
      following: 210,
      posts: 97,
      is_private: true,
      created_at: "2019-11-22T14:15:00Z",
    },
    {
      user_id: "3",
      username: "sara_plays",
      full_name: "Sara Johnson",
      bio: "Gamer 🎮 | Artist | Dream chaser",
      profile_picture: "https://example.com/images/sara_johnson.jpg",
      followers: 3200,
      following: 450,
      posts: 210,
      is_private: false,
      created_at: "2021-06-10T09:45:00Z",
    },
    {
      user_id: "4",
      username: "mike_the_explorer",
      full_name: "Mike Brown",
      bio: "Adventure seeker 🗺️ | Nature lover | #Wanderlust",
      profile_picture: "https://example.com/images/mike_brown.jpg",
      followers: 670,
      following: 180,
      posts: 85,
      is_private: false,
      created_at: "2022-01-05T16:20:00Z",
    },
    {
      user_id: "5",
      username: "lily_bakes",
      full_name: "Lily Evans",
      bio: "Baking is my therapy 🍰 | Sweet tooth | Recipe creator",
      profile_picture: "https://example.com/images/lily_evans.jpg",
      followers: 2300,
      following: 300,
      posts: 175,
      is_private: false,
      created_at: "2020-09-12T12:00:00Z",
    },
    {
      user_id: "6",
      username: "tom_rides",
      full_name: "Tom Wilson",
      bio: "Motorcycle life 🏍️ | Road tripper | #RideOrDie",
      profile_picture: "https://example.com/images/tom_wilson.jpg",
      followers: 980,
      following: 250,
      posts: 110,
      is_private: true,
      created_at: "2021-03-25T08:10:00Z",
    },
    {
      user_id: "7",
      username: "emma_yoga",
      full_name: "Emma Davis",
      bio: "Yoga teacher 🧘‍♀️ | Mindful living | #ZenVibes",
      profile_picture: "https://example.com/images/emma_davis.jpg",
      followers: 1500,
      following: 320,
      posts: 130,
      is_private: false,
      created_at: "2018-12-01T11:25:00Z",
    },
    {
      user_id: "8",
      username: "chris_codes",
      full_name: "Chris Lee",
      bio: "Tech geek 💻 | Coding is life | #Developer",
      profile_picture: "https://example.com/images/chris_lee.jpg",
      followers: 420,
      following: 150,
      posts: 60,
      is_private: true,
      created_at: "2023-02-18T15:40:00Z",
    },
    {
      user_id: "9",
      username: "nina_snaps",
      full_name: "Nina Patel",
      bio: "Photographer 📸 | Capturing moments | #Shutterbug",
      profile_picture: "https://example.com/images/nina_patel.jpg",
      followers: 5000,
      following: 600,
      posts: 300,
      is_private: false,
      created_at: "2017-07-30T13:50:00Z",
    },
    {
      user_id: "10",
      username: "zoe_reads",
      full_name: "Zoe Carter",
      bio: "Bookworm 📚 | Coffee addict | #Bookstagram",
      profile_picture: "https://example.com/images/zoe_carter.jpg",
      followers: 780,
      following: 290,
      posts: 95,
      is_private: false,
      created_at: "2022-10-08T17:30:00Z",
    },
  ],
  columns = [
    {
      header: "User ID",
      accessorKey: "user_id",
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Full Name",
      accessorKey: "full_name",
    },
    {
      header: "Bio",
      accessorKey: "bio",
    },
    {
      header: "Followers",
      accessorKey: "followers",
    },
    {
      header: "Following",
      accessorKey: "following",
    },
    {
      header: "Posts",
      accessorKey: "posts",
    },
    {
      header: "Private Account",
      accessorKey: "is_private",
    },
    {
      header: "Created At",
      accessorKey: "created_at",
    },
  ],
  defaultPageSize = [5],
  pageSizeOptions = [5, 10],
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
  console.log("Table", table.getAllColumns());
  return (
    <div className="p-5 bg-gray-100 mx-auto max-w-7xl rounded-lg shadow-md mt-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold ">Static table</h1>
        </div>
        <div className="relative group">
          <div
            className={`flex items-center justify-center px-5 py-2.5 rounded-full bg-white cursor-pointer`}
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
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/*Tanstack Table */}
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

export default StaticTanstackTable;
