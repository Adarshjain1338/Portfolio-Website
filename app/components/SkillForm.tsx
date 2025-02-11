import React, { useEffect, useState } from "react";
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
import { Trash2 } from "lucide-react";
import { AllProjectAPI } from "@/lib/apiURL";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Field {
  name: string;
  type: "text" | "number" | "select";
  options?: string[];
}

interface Skill {
  id?: string;
  isNew: boolean;
  isEdited: boolean;
  [key: string]: any;
}

interface SkillFormProps {
  tableFields: Field[];
  tableData: Skill[];
  refreshData: () => void;
}

export function SkillForm({ tableFields, tableData, refreshData }: SkillFormProps) {
  const [skills, setSkills] = useState<Skill[]>(
    tableData.map((skill) => ({ ...skill, isNew: false, isEdited: false }))
  );

  const handleInputChange = (index: number, field: string, value: any) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) =>
        i === index
          ? {
              ...skill,
              [field]: field === "proficiency" || field === "order" ? parseInt(value, 10) || 0 : value.trim(),
              isEdited: !skill.isNew,
            }
          : skill
      )
    );
  };

  useEffect(() => {
    setSkills(
      tableData.map((skill) => ({ ...skill, isNew: false, isEdited: false }))
    );
  }, [tableData]);

  const addSkillRow = () => {
    const emptySkill: Skill = { isNew: true, isEdited: false };
    tableFields.forEach((field) => {
      emptySkill[field.name] = "";
    });
    setSkills((prev) => [...prev, emptySkill]);
  };

  const deleteSkillRow = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const validateSkills = (filteredSkills: Skill[]) => {
    for (const skill of filteredSkills) {
      for (const field of tableFields) {
        const value = skill[field.name];
        if (field.name !== "id" && (!value || (typeof value === "string" && !value.trim()))) {
          toast.error(`${field.name} is required`);
          return false;
        }
      }
    }
    return true;
  };

  const saveSkillData = async () => {
    const filteredSkills = skills.filter((skill) => skill.isNew || skill.isEdited);
    if (filteredSkills.length === 0) return toast.error("No new or edited skills to save");
    if (!validateSkills(filteredSkills)) return;
    try {
      await axios.post(AllProjectAPI.Skills.saveSkillData, { data: filteredSkills });
      toast.success("Skills saved successfully");
      refreshData();
    } catch (error) {
      console.error("Error saving skills:", error);
      toast.error("Failed to save skills");
    }
  };

  return (
    <div>
      <Toaster />
      <h2 className="text-lg font-semibold animate-pulse">Skill Table</h2>
      <Button onClick={addSkillRow} className="mb-4">Add Skill</Button>
      <Table>
        <TableHeader>
          <TableRow>
            {tableFields.map((field) => (
              <TableHead key={field.name}>{field.name.toUpperCase()}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((row, index) => (
            <TableRow key={row.id || index}>
              {tableFields.map((field) => (
                <TableCell key={field.name}>
                  {field.type === "text" ? (
                    <Input
                      type="text"
                      value={row[field.name] || ""}
                      onChange={(e) => handleInputChange(index, field.name, e.target.value)}
                      disabled={field.name === "id" && !row.isNew}
                      size={field.name === "id" ? 1 : 3}
                    />
                  ) : field.type === "number" ? (
                    <Input
                      type="number"
                      max={10}
                      min={0}
                      value={row[field.name] || ""}
                      onChange={(e) => handleInputChange(index, field.name, e.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      onValueChange={(value) => handleInputChange(index, field.name, value)}
                      defaultValue={row[field.name]}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${field.name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}
                </TableCell>
              ))}
              <TableCell>
                <Button variant="ghost" onClick={() => deleteSkillRow(index)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={saveSkillData} className="mt-4">Save Skills</Button>
    </div>
  );
}
