'use client'

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { FormUpSertDoctor } from "./form-upsert-doctor";

export function ButtonCreateDoctor() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">
          <Plus />
          Adicionar médico
        </Button>
      </DialogTrigger>

      <FormUpSertDoctor onSuccess={() => setIsOpen(false)} />
    </Dialog>
  )
}