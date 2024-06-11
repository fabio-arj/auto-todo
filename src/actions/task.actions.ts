"use server";

import { generateId } from "lucia";
import { prisma } from "@/lib/database";
import { TaskSchema } from "@/lib/schemas";
import { z } from "zod";
import { getUser } from "@/lib/lucia";

export const addTask = async (values: z.infer<typeof TaskSchema>) => {
  const taskId = generateId(15);
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("User id not defined");

  try {
    await prisma.task.create({
      data: {
        description: values.description,
        id: taskId,
        userId: userId,
      },
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const updateTask = async (values: z.infer<typeof TaskSchema>) => {
  const user = await getUser();
  const userId = user?.id;
  const taskId = values.id;

  if (!userId) throw new Error("User id not defined");

  try {
    await prisma.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: {
        description: values.description,
      },
    });
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const deleteTask = async (values: z.infer<typeof TaskSchema>) => {
  const user = await getUser();
  const userId = user?.id;
  const taskId = values.id;

  if (!userId) throw new Error("User id not defined");

  try {
    await prisma.task.delete({
      where: {
        userId: userId,
        id: taskId,
      },
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const getTasks = async () => {
  const user = await getUser();
  const userId = user?.id;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      select: {
        description: true,
        id: true,
      },
    });

    return {
      tasks,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
