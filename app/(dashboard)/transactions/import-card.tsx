import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useStartTyping } from "react-use";
import { ImportTable } from "./import-table";

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

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Import Transaction
            </CardTitle>
            <div className="flex items-center gap-x-2">
              <Button onClick={onCancel} size="sm">
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ImportTable
              headers={headers}
              body={body}
              selectedColumns={selectedColumns}
              onTableHeadSelectChange={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
// 8.10
