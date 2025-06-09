"use client"

import React from "react";

import {
  MoreVerticalIcon,
  Edit,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";

import { FormUpsertPatient } from "./form-upsert-patient";
import { patientsTable } from "@/database/schema";
import { ButtonDeletePatient } from "./button-delete-patient";

interface TablePatientActionProps {
  patient: typeof patientsTable.$inferSelect;
}

export function TablePatientAction({ patient }: TablePatientActionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOnSuccess() {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVerticalIcon className="w-4 h-4 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Edit />
            Editar
          </DropdownMenuItem>

          <ButtonDeletePatient patient={patient} />

        </DropdownMenuContent>
      </DropdownMenu>

      <FormUpsertPatient
        onSuccess={handleOnSuccess}
        patient={patient} />
    </Dialog>
  )
}