import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { AllProjectAPI } from "@/lib/apiURL";
import axios from "axios";

interface DynamicFormProps {
  tableName: string;
}

export function DynamicForm({ tableName }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [tableFields, setTableFields] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  // Fetch table details (fields and data) from the API
  const getTableDetails = async () => {
    try {
      const response = await axios.post(AllProjectAPI.GetTableDetails, {
        tableKey: tableName,
      });
      setTableFields(response.data.fields || []);
      setTableData(response.data.data || []);

      // Pre-fill formData with the first record (if available)
      if (response.data.data && response.data.data.length > 0) {
        const initialFormData: Record<string, any> = {};
        response.data.fields.forEach((field: any) => {
          initialFormData[field.name] = response.data.data[0][field.name] || "";
        });
        setFormData(initialFormData);
      }

      console.log(response, "API Called");
    } catch (error) {
      console.error("Error fetching table details:", error);
    }
  };

  // Fetch data when the tableName changes
  useEffect(() => {
    getTableDetails();
  }, [tableName]);

  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   // Send formData to the backend API for processing (e.g., update or create)
  //   try {
  //     // Example: Send updated data to the API
  //     const response = await axios.post(AllProjectAPI.UpdateTableData, {
  //       tableKey: tableName,
  //       data: formData,
  //     });
  //     console.log("Update successful:", response.data);
  //   } catch (error) {
  //     console.error("Error updating table data:", error);
  //   }
  // };

  return (
    <form onSubmit={()=>alert("saved")} className="space-y-4">
      <h2 className="text-lg font-semibold animate-pulse">{tableName} Form</h2>
      {tableFields.map((field: any) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </label>
          {field.type === "text" && (
            <Input
              type="text"
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="mt-1 block w-full"
            />
          )}
          {field.type === "textarea" && (
            <Textarea
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="mt-1 block w-full"
            />
          )}
          {field.type === "select" && (
            <Select
              onValueChange={(value) => handleChange(field.name, value)}
              defaultValue={formData[field.name]}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder={`-- Select ${field.name} --`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {field.type === "checkbox" && (
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="checkbox"
                id={field.name}
                checked={formData[field.name] || false}
                onChange={(e) => handleChange(field.name, e.target.checked)}
              />
              <label htmlFor={field.name}>Enable</label>
            </div>
          )}
          {field.type === "number" && (
            <Input
              type="number"
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="mt-1 block w-full"
            />
          )}
          {field.type === "array" && (
            <Input
              type="text"
              id={field.name}
              value={formData[field.name]?.join(", ") || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value.split(",").map((s) => s.trim()))
              }
              placeholder="Enter comma-separated values"
              className="mt-1 block w-full"
            />
          )}
        </div>
      ))}
      <Button type="submit" className="w-23">
        Submit
      </Button>
    </form>
  );
}