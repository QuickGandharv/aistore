const SampleUser = [
  {
    header: "ID",
    accessorKey: "id",
    enableSorting: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    sortingFn: "text",
    enableSorting: true,
  },
  { header: "Age", accessorKey: "age", enableSorting: false },
  {
    header: "City",
    accessorKey: "city",
    sortingFn: "text",
    enableSorting: true,
  },
  {
    header: "Active",
    accessorKey: "active",
    enableSorting: false,
  },
];

export default SampleUser;
