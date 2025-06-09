'use client'

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DialogTrigger, Dialog } from "@/components/ui/dialog";
import { FormUpsertPatient } from "./form-upsert-patient";

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

      <FormUpsertPatient onSuccess={handleOnSuccess} />
    </Dialog>
  )
}