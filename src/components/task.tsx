import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";

export default function Component() {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-6">
        <div className="space-y-1">
          <CardTitle>Call mom</CardTitle>
          <CardDescription>
            Remember to wish her a happy birthday!
          </CardDescription>
        </div>
        <div className="ml-auto space-y-1 md:space-y-2">
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
      </CardHeader>
      <CardContent className="p-6">
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
      </CardContent>
    </Card>
  );
}
