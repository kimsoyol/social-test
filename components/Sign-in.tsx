"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormError from "@/components/FormError";
import { authenticate } from "@/lib/action";
import { useFormState } from "react-dom";

export function SignIn() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="max-w-lg mx-auto mt-24 shadow-lg">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Social</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={dispatch}>
            <Input
              name="email"
              type="email"
              placeholder="email"
              className="mb-4"
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="password"
              className="mb-4"
              required
            />
            <FormError message={errorMessage} />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
