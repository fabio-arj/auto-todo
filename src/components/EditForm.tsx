"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { TaskSchema } from "@/lib/schemas";
import { updateTask } from "@/actions/task.actions";
import { DialogClose } from "./ui/dialog";

export default function EditForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    const res = await updateTask(values);
    if (res?.error) {
      toast({
        variant: "destructive",
        description: res.error,
        duration: 3000,
      });
    } else if (res.success) {
      toast({
        description: "Tarefa editada",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tarefa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit" className="w-full">
            Editar tarefa
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
