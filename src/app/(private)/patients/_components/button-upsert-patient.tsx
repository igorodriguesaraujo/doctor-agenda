'use client'

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DialogTrigger, Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FormUpsertPatient } from "./form-upsert-patient";
import { DialogTitle } from "@radix-ui/react-dialog";

export function ButtonUpsertPatients() {
  const [isOpenDialogUpsertPatient, setIsOpenDialogUpsertPatient] = React.useState(false)

  function handleOnSuccess() {
    setIsOpenDialogUpsertPatient(false)
  }

  return (
    <Dialog
      open={isOpenDialogUpsertPatient}
      onOpenChange={setIsOpenDialogUpsertPatient}>
      <DialogTrigger asChild>
        <Button variant='primary' size='sm'>
          <Plus />
          Adicionar paciente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Adicionar novo paciente
          </DialogTitle>
        </DialogHeader>

        <FormUpsertPatient onSuccess={handleOnSuccess} />

      </DialogContent>
    </Dialog>
  )
}