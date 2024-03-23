import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

export default function Confirmation() {
  return (
    <main className="flex h-screen w-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Email enviado</CardTitle>
          <CardDescription>
            O email de confirmação foi enviado com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center pt-4">
          <EnvelopeClosedIcon className="h-14 w-14" />
        </CardContent>
      </Card>
    </main>
  );
}
