import React, { useState } from "react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { AllProjectAPI } from "@/lib/apiURL";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Define the structure of table fields
interface Field {
  name: string;
  type: string;
  options?: string[];
}

// Define the props for SkillForm
interface SkillFormProps {
  tableFields: Field[];
  tableData: any[];
  refreshData: () => void;
}

export function SkillForm({ tableFields, tableData, refreshData }: SkillFormProps) {
    console.log(tableData, tableFields)
  const [skills, setSkills] = useState<any[]>([tableData]);

  // Handle input changes
  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  // Add a new empty skill row
  const addSkillRow = () => {
    const emptySkill: any = {};
    tableFields.forEach(field => {
      emptySkill[field.name] = "";
    });
    setSkills([...skills, emptySkill]);
  };

  // Save skill data to the server
  const saveSkillData = async () => {
    try {
      const response = await axios.post(AllProjectAPI.Skills.saveSkillData, { data: skills });
      if (response.status === 200) {
        toast.success("Skills saved successfully");
        refreshData();
      } else {
        toast.error("Failed to save skills");
      }
    } catch (error) {
      console.error("Error saving skills:", error);
      toast.error("Failed to save skills");
    }
  };

  return (
    <div>
      <Toaster />
      <h2 className="text-lg font-semibold animate-pulse">Skill Table</h2>
      <Button onClick={addSkillRow} className="mb-4">
        Add Skill
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            {tableFields.map((field) => (
              <TableHead key={field.name}>{field.name.toUpperCase()}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((row, index) => (
            <TableRow key={index}>
              {tableFields.map((field) => (
                <TableCell key={field.name}>
                  {field.name === "id" ? (
                    <Input
                      type="text"
                      value={row[field.name] || ""}
                      disabled
                    />
                  ) : field.type === "text" ? (
                    <Input
                      type="text"
                      value={row[field.name] || ""}
                      onChange={(e) => handleInputChange(index, field.name, e.target.value)}
                    />
                  ) : field.type === "number" ? (
                    <Input
                      type="number"
                      value={row[field.name] || ""}
                      onChange={(e) => handleInputChange(index, field.name, e.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      onValueChange={(value) => handleInputChange(index, field.name, value)}
                      defaultValue={row[field.name]}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`-- Select ${field.name} --`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={saveSkillData} className="mt-4">
        Save Skills
      </Button>
    </div>
  );
}