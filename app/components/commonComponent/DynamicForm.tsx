import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "../ui/select";
import { Button } from "../ui/button";
import { tableMetadata } from "@/lib/utils";

interface DynamicFormProps {
  tableName: string;
}

export function DynamicForm({ tableName }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Send formData to the backend API for processing
  };

  const fields = tableMetadata[tableName as keyof typeof tableMetadata];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold animate-pulse">{tableName} Form</h2>
      {fields.map((field:any) => (
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
                {field.options?.map((option:any) => (
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
              onChange={(e) => handleChange(field.name, e.target.value.split(",").map((s) => s.trim()))}
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