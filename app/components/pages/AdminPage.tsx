import React, { useState } from "react";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { tableMetadata } from "@/lib/utils";
import { DynamicForm } from "../commonComponent/DynamicForm";
import "../../global.scss"

export default function AdminPage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-6 gap-3 mb w-full h-full">
        <div className="col-span-4 col-start-2 m-3">
        <Card className="col-span-3 row-span-1 p-2 ">
          <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
          {/* Table Selection Dropdown */}
          <div className="mb-4">
            <label htmlFor="table-select" className="block text-sm font-medium text-gray-700">
              Select Table
            </label>
            <Select onValueChange={(value) => setSelectedTable(value)}>
              <SelectTrigger id="table-select" className="mt-1 w-1/2">
                <SelectValue placeholder="-- Select a Table --" />
              </SelectTrigger>
              <SelectContent className="w-1/2">
                {Object.keys(tableMetadata).map((tableName) => (
                  <SelectItem key={tableName} value={tableName}>
                    {tableName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Render Input Fields Based on Selected Table */}
          {selectedTable && <DynamicForm tableName={selectedTable} />}
        </Card>
    </div>
    </div>
  );
}