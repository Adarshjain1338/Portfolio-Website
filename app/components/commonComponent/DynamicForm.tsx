import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { AllProjectAPI } from "@/lib/apiURL";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { SkillForm } from "../SkillForm";

interface DynamicFormProps {
  tableName: string;
}

export function DynamicForm({ tableName }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [tableFields, setTableFields] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    getTableDetails();
  }, [tableName]);

  const getTableDetails = async () => {
    try {
      const response = await axios.post(AllProjectAPI.GetTableDetails, { tableKey: tableName });
      setTableFields(response.data.fields || []);
      setTableData(response.data.data || []);
      console.log("first", tableName)
      console.log('response', response)
      // Pre-fill formData with the first record (if available)
     
    } catch (error) {
      console.error("Error fetching table details:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    if (tableData && tableData.length > 0) {
      const initialFormData: Record<string, any> = {};
      tableFields.forEach((field: any) => {
        initialFormData[field.name] = tableData[0][field.name] || "";
      });
      setFormData(initialFormData);
    }
  
    
  }, [tableData])
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (tableName === "Skill") {
      saveSkillData();
    } else {
      console.log("Table Save API not found in BE");
    }
  };

  const saveSkillData = async () => {
    try {
      const response = await axios.post(AllProjectAPI.Skills.saveSkillData, { data: formData });
      if (response.status === 200) {
        toast.success("Skill Data Saved Successfully");
        getTableDetails();
      } else {
        toast.error("Data Save Failed");
      }
    } catch (error) {
      console.error("Error saving skill data:", error);
      toast.error("Data Save Failed");
    }
  };

  return (
    <>
      <Toaster />
      {tableName === "Skill" 
      ? (
        <SkillForm tableFields={tableFields} tableData={tableData} refreshData={getTableDetails} />) 
      : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold animate-pulse">{tableName} Form</h2>
          {tableFields.map((field) => (
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
                  disabled={field.name === "id"}
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
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === "textarea" && (
                <Textarea
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="mt-1 block w-full"
                />
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
            </div>
          ))}
          <Button type="submit" className="w-23">
            Submit
          </Button>
        </form>
      )}
    </>
  );
}
