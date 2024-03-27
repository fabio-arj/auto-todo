"use client";

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
import { signIn } from "@/actions/auth.actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { validateRequest } from "@/lib/auth";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default async function SignInPage() {
  const { user } = await validateRequest();

  if (user) {
  }
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const res = await signIn(values);
    if (res?.error) {
      console.log(res.error);
      toast({
        variant: "destructive",
        description: res.error,
        duration: 3000,
      });
    } else if (res.success) {
      toast({
        description: "LogIn realizado com sucesso",
      });
      router.push("/");
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/4"
        >
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
