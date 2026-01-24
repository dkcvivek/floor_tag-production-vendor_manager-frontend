import React from "react";
import { Stage } from "../types/types";

const COLUMNS = 5;

interface Props {
  data: Stage[];
}

const ConnectorBox: React.FC<Props> = ({ data }) => {
  const stages = data;
  const total = stages.length;

  const breakIndex = stages.findIndex(s => s.status === "FAILED");

  const getStageColor = (index: number) => {
    if (breakIndex === -1 || index < breakIndex)
      return "bg-green-600 border-green-600 text-white";

    if (index === breakIndex)
      return "bg-red-600 border-red-600 text-white";

    return "bg-gray-300 border-gray-300 text-gray-600";
  };

  const getGridPosition = (index: number) => {
    const row = Math.floor(index / COLUMNS);
    const colInRow = index % COLUMNS;

    const col =
      row % 2 === 0
        ? colInRow
        : COLUMNS - 1 - colInRow;

    return { row, col };
  };

  return (
    <div
      className="relative grid gap-y-10"
      style={{
        gridTemplateColumns: `repeat(${COLUMNS}, minmax(0,1fr))`,
        columnGap: "2rem",
      }}
    >
      {stages.map((stage, index) => {
        const { row, col } = getGridPosition(index);
        const next =
          index + 1 < total ? getGridPosition(index + 1) : null;

        const drawHorizontal = next && row === next.row;
        const drawVertical = next && row !== next.row;

        return (
          <div
            key={stage.id}
            className="relative flex items-center justify-center"
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
            }}
          >
            <div
              className={`w-8 h-8 rounded border-2 flex items-center justify-center text-xs font-semibold ${getStageColor(
                index
              )}`}
            >
              {stage.id}
            </div>

            {drawHorizontal && (
              <div
                className="absolute top-1/2 border-t-2 border-dashed border-gray-400"
                style={{
                  width: "2rem",
                  left: next!.col > col ? "100%" : undefined,
                  right: next!.col < col ? "100%" : undefined,
                }}
              />
            )}

            {drawVertical && (
              <div className="absolute left-1/2 top-full h-8 border-l-2 border-dashed border-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ConnectorBox;
