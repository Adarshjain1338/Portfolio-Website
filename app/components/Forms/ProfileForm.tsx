import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AllProjectAPI } from "@/lib/apiURL";
import toast, { Toaster } from "react-hot-toast";
import { saveFormData } from "../commonComponent/SaveFormService";
import { FormField } from "../commonComponent/FormField";

interface ProfileFormProps {
  tableFields: any[];
  tableData: any[];
  refreshData: () => void;
}

export function ProfileForm({ tableFields, tableData, refreshData }: ProfileFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (tableData.length > 0) {
      const initialFormData: Record<string, any> = {};
      tableFields.forEach((field) => {
        initialFormData[field.name] = tableData[0][field.name] || "";
      });
      setFormData(initialFormData);
    }
  }, [tableData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveFormData(AllProjectAPI.Profile.saveProfileData, formData, refreshData);
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold animate-pulse">Profile Form</h2>
        {tableFields.map((field) => (
          <FormField key={field.name} field={field} value={formData[field.name]} onChange={handleChange} />
        ))}
        <Button type="submit" className="w-23">
          Submit
        </Button>
      </form>
    </>
  );
}
