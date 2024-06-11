"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Task } from "@/lib/types";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import EditForm from "./EditForm";

export default function TaskCard(props: Task) {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-6">
        <div className="flex w-full justify-between">
          <CardTitle>{props.description}</CardTitle>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Due on Apr 15, 2023
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Created on Mar 15, 2023
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Checkbox defaultChecked id="complete" />
              <Label htmlFor="complete">Mark as complete</Label>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Checkbox id="subtask1" />
                <Label htmlFor="subtask1">Buy flowers</Label>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox id="subtask2" />
                <Label htmlFor="subtask2">Get a card</Label>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox id="subtask3" />
                <Label htmlFor="subtask3">Call the restaurant</Label>
              </div>
            </div>
          </div>
          <div className="flex items-end space-x-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button id={props.id}>Edit</Button>
              </DialogTrigger>
              <DialogContent>
                <EditForm></EditForm>
              </DialogContent>
            </Dialog>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
