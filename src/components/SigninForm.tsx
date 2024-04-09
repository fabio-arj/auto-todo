"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SignInSchema } from "@/lib/schemas";
import { signIn } from "@/lib/lucia";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SigninForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof SignInSchema>) => {
      signIn(values).then((res) => {
        if (res?.error) {
          console.log(res.error);
          toast({
            variant: "destructive",
            description: res.error,
            duration: 3000,
          });
        } else if (res.success) {
          router.push("/");
        }
      });
    }
  );

  return (
    <div className="flex h-screen justify-center items-center">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-5 w-1/4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <Button type="submit" variant={"secondary"} className="w-full">
            Entrar com Google
          </Button>
          <p className="w-full text-sm text-center">
            Não possui uma conta ? {""}
            <Link href="/sign-up" className="underline">
              Criar conta
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
