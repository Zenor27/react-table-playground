import { createColumnHelper } from "@tanstack/react-table";
import { SKIP_HEADER } from "./components/Table/Header";
import { Data, Total, Detail } from "./components/Table/types";

export const makeColumns = ({
  data,
  totals,
}: {
  data: Data[];
  totals: Total[];
}) => {
  const columnHelper = createColumnHelper<Data>();

  const periods = data.flatMap((d) => d.periods);
  const periodNames = Array.from(new Set(periods.map((p) => p.name)));

  return [
    columnHelper.group({
      id: "mainColumn",
      header: undefined,
      columns: [
        columnHelper.accessor("project", {
          id: "mainColumn",
          header: SKIP_HEADER,
          cell: (info) => {
            const isExpended = info.row.getIsExpanded();
            return (
              <div className="pl-4">
                <button onClick={() => info.row.toggleExpanded(!isExpended)}>
                  {isExpended ? "🥖" : "🍞"}
                </button>
                {info.getValue()}
              </div>
            );
          },
        }),
      ],
    }),
    ...periodNames.map((name) => {
      return columnHelper.group({
        id: name,
        header: () => {
          return (
            <div className="flex flex-col items-end">
              <span>{name}</span>
              <span>Du XX au XX Sept.</span>
            </div>
          );
        },
        columns: [
          columnHelper.group({
            id: `prevreal${name}`,
            header: SKIP_HEADER,
            columns: [
              columnHelper.accessor(
                (row) => {
                  const period = row.periods.find((p) => p.name === name);
                  return period?.prev;
                },
                {
                  id: `prev${name}`,
                  header: SKIP_HEADER,
                  footer: () => {
                    const total = totals.find((t) => t.periodName === name);
                    return (
                      <div className="text-right bg-neutral50 text-neutral500 py-2">
                        {total?.prev}
                      </div>
                    );
                  },
                  cell: (info) => (
                    <div className="text-right bg-neutral50 text-neutral500 py-2">
                      {info.getValue()}
                    </div>
                  ),
                }
              ),
              columnHelper.accessor(
                (row) => {
                  const period = row.periods.find((p) => p.name === name);
                  return period?.real;
                },
                {
                  id: `real${name}`,
                  header: SKIP_HEADER,
                  footer: () => {
                    const total = totals.find((t) => t.periodName === name);
                    return (
                      <div className="text-right bg-positive50 text-neutral800 py-2">
                        {total?.real}
                      </div>
                    );
                  },
                  cell: (info) => (
                    <div className="text-right bg-positive50 text-neutral800 py-2">
                      {info.getValue()}
                    </div>
                  ),
                }
              ),
            ],
          }),
        ],
      });
    }),
  ];
};

export const makeDetailsColumns = ({ details }: { details: Detail[] }) => {
  const columnHelper = createColumnHelper<Detail>();

  const periods = details.flatMap((d) => d.periods);
  const periodNames = Array.from(new Set(periods.map((p) => p.name)));

  return [
    columnHelper.group({
      id: "mainColumn",
      header: undefined,
      columns: [
        columnHelper.accessor("userName", {
          id: "mainColumn",
          cell: (info) => {
            return <div className="pl-8">🧏‍♂️ {info.getValue()}</div>;
          },
        }),
      ],
    }),
    ...periodNames.map((name) => {
      return columnHelper.group({
        header: name,
        columns: [
          columnHelper.group({
            id: `prevreal${name}`,
            header: SKIP_HEADER,
            columns: [
              columnHelper.accessor(
                (row) => {
                  const period = row.periods.find((p) => p.name === name);
                  return period?.prev;
                },
                {
                  id: `prev${name}`,
                  header: SKIP_HEADER,
                  cell: (info) => (
                    <div className="text-right bg-neutral50 text-neutral500 py-2">
                      {info.getValue()}
                    </div>
                  ),
                }
              ),
              columnHelper.accessor(
                (row) => {
                  const period = row.periods.find((p) => p.name === name);
                  return period?.real;
                },
                {
                  id: `real${name}`,
                  header: SKIP_HEADER,
                  cell: (info) => (
                    <div className="text-right bg-positive50 text-neutral800 py-2">
                      {info.getValue()}
                    </div>
                  ),
                }
              ),
            ],
          }),
        ],
      });
    }),
  ];
};
