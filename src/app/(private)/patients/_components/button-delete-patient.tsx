'use client'

import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deletePatientAction } from "@/actions/patients/delete-patient-action";
import { patientsTable } from "@/database/schema";
import React from "react";

interface ButtonDeletePatientProps {
  patient: typeof patientsTable.$inferSelect;
}

export function ButtonDeletePatient({ patient }: ButtonDeletePatientProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const { execute, isPending } = useAction(deletePatientAction, {
    onSuccess: () => {
      toast.success('Paciente removido com sucesso!');
    },
    onError: () => {
      toast.error('Houve um problema, Paciente não foi removido.');
    },
    onSettled: () => [
      setIsOpen(false)
    ]
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash2 />
          Excluir
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja remover o paciente?</AlertDialogTitle>
          <AlertDialogDescription>
            Está ação não pode ser revertida, Ela removerá permanentimente o paciente e todo o seu histórico.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            disabled={isPending}
            variant="primary"
            onClick={() => execute(patient)}
          >
            {isPending && <Loader2 className="animate-spin" />} Remover
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}