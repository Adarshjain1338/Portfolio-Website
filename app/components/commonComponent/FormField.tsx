import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FormFieldProps {
  field: any;
  value: any;
  onChange: (field: string, value: any) => void;
}

export function FormField({ field, value, onChange }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
      </label>

      {field.type === "text" && (
        <Input
          type="text"
          id={field.name}
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="mt-1 block w-full"
          disabled={field.name === "id"}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          id={field.name}
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
          className="mt-1 block w-full"
        />
      )}

      {field.type === "number" && (
        <Input
          type="number"
          id={field.name}
          value={value || ""}
          onChange={(e) => onChange(field.name, Number(e.target.value))}
          className="mt-1 block w-full"
        />
      )}

      {field.type === "select" && (
        <Select
          onValueChange={(val) => onChange(field.name, val)}
          defaultValue={value}
        >
          <SelectTrigger className="mt-1 w-full">
            <SelectValue placeholder={`Select ${field.name}`} />
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
    </div>
  );
}
