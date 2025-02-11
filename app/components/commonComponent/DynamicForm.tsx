import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { AllProjectAPI } from "@/lib/apiURL";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { SkillForm } from "../SkillForm";
import { ProfileForm } from "../Forms/ProfileForm";

// Importing different form components

interface DynamicFormProps {
  tableName: string;
}

export function DynamicForm({ tableName }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [tableFields, setTableFields] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  // Fetch table details whenever tableName changes
  useEffect(() => {
    if(formData){ 
      setFormData([]);
      setTableData([]);
    }
    getTableDetails();
  }, [tableName]);

  const getTableDetails = async () => {
    try {
      const response = await axios.post(AllProjectAPI.GetTableDetails, { tableKey: tableName });
      console.log("Table details:", response.data);
      setTableFields(response.data.fields || []);
      setTableData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching table details:", error);
    }
  };

  // Initialize formData when tableData updates
  useEffect(() => {
    if (tableData.length > 0) {
      const initialFormData: Record<string, any> = {};
      tableFields.forEach((field: any) => {
        initialFormData[field.name] = tableData[0]?.[field.name] || "";
      });
      setFormData(initialFormData);
    }
  }, [tableData, tableFields]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        getTableDetails(); // Refresh data after saving
      } else {
        toast.error("Data Save Failed");
      }
    } catch (error) {
      console.error("Error saving skill data:", error);
      toast.error("Data Save Failed");
    }
  };

  // **Use specific forms for predefined tables**
  switch (tableName) {
    case "Profile":
      return <ProfileForm tableFields={tableFields} tableData={tableData} refreshData={getTableDetails} />;
    // case "Projects":
    //   return <ProjectForm tableFields={tableFields} tableData={tableData} refreshData={getTableDetails} />;
    // case "Quotes":
    //   return <QuoteForm tableFields={tableFields} tableData={tableData} refreshData={getTableDetails} />;
    // case "Media":
    //   return <MediaForm tableFields={tableFields} tableData={tableData} refreshData={getTableDetails} />;
    // case "SocialLinks":
    //   return <SocialLinkForm tableFields={tableFields} tableData={tableData} refreshData={getTableDetails} />;
    case "Skills":
      return <SkillForm tableFields={tableFields} tableData={tableData} refreshData={getTableDetails}/>;
  }

  // **Default Form for dynamic tables**
  return (
    <>
      <Toaster />
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
                onChange={(e) => handleChange(field.name, Number(e.target.value))}
                className="mt-1 block w-full"
              />
            )}
          </div>
        ))}

        <Button type="submit" className="w-23">
          Submit
        </Button>
      </form>
    </>
  );
}
