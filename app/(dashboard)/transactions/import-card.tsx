import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useStartTyping } from "react-use";
import { ImportTable } from "./import-table";
import { projectEntrypointsSubscribe } from "next/dist/build/swc/generated-native";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  // handle continue method

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Import Transaction
            </CardTitle>
            <div className="flex flex-col gap-y-2 lg:flex-row items-center gap-x-2">
              <Button size="sm" className="w-full lg:w-auto" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="w-full lg:w-auto"
                disabled={progress < requiredOptions.length}
                onClick={() => {}}
              >
                Continue ({progress} / {requiredOptions.length})
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ImportTable
              headers={headers}
              body={body}
              selectedColumns={selectedColumns}
              onTableHeadSelectChange={onTableHeadSelectChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
// 8.10
