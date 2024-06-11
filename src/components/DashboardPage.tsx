import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  ListBulletIcon,
  PlusIcon,
  CheckCircledIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import TaskCard from "@/components/TaskCard";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import TaskForm from "./TaskForm";
import { getTasks } from "@/actions/task.actions";

export default async function DashboardPage() {
  const tasks = await getTasks();

  return (
    <div className="flex min-h-screen w-full items-start bg-background">
      <div className="hidden border-r border-border dark:border-border lg:block w-[300px] h-screen">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center  justify-between border-b border-border px-6 dark:border-border">
            <div className="flex items-center">
              <ListBulletIcon />
              <h1 className="ml-2 text-lg font-semibold">Tasks</h1>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="ml-auto rounded-full w-7 h-7 border border-border dark:border-border"
                  size="icon"
                  variant="ghost"
                >
                  <PlusIcon />
                  <span className="sr-only">Add task</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <TaskForm></TaskForm>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex-1 overflow-auto p-2">
            <ul className="grid gap-2 text-sm">
              <li>
                <Link
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-foreground transition-all hover:text-gray-900 dark:text-foreground dark:hover:text-gray-50"
                  href="#"
                >
                  <CheckCircledIcon className="h-4 w-4" />
                  <span className="">Grocery shopping</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex h-14 items-center gap-4 border-b border-border px-6 dark:bg-bordborder-border/40">
          <Link className="lg:hidden" href="#">
            <ListBulletIcon className="h-6 w-6" />
            <span className="sr-only">Tasks</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground dark:text-foreground" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search tasks..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            Avatar
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-border w-8 h-8 dark:border-border"
                id="tasks"
                size="icon"
                variant="ghost"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Tasks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Checkbox className="mr-2 h-4 w-4" />
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClockIcon className="mr-2 h-4 w-4" />
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem>
                <StarIcon className="mr-2 h-4 w-4" />
                Important
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" />
                New List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 flex flex-col p-4 md:p-6 gap-4">
          {tasks.tasks?.map((task) => {
            return (
              <TaskCard description={task.description} id={task.id}></TaskCard>
            );
          })}
        </main>
      </div>
    </div>
  );
}
