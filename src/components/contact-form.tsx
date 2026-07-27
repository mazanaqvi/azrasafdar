"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { CheckCircle2Icon, ChevronDownIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import {
  FIELD,
  FieldError,
  LABEL,
  SELECT,
  TEXTAREA,
} from "@/components/form-primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactEnquiry } from "@/lib/actions/contact";
import { enquiryTopics, initialContactState } from "@/lib/contact";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactEnquiry,
    initialContactState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const baseId = useId();

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    } else if (
      state.status === "error" &&
      Object.keys(state.fieldErrors).length === 0
    ) {
      toast.error(state.message);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-card p-12 text-center shadow-soft ring-1 ring-primary/20">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary">
          <CheckCircle2Icon className="size-8 text-primary" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Message sent</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 rounded-2xl bg-card p-7 shadow-soft ring-1 ring-border sm:p-9"
      noValidate
    >
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={fieldId("company")}>Company</label>
        <input
          id={fieldId("company")}
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={fieldId("name")} className={LABEL}>
            Your name
          </Label>
          <Input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            className={FIELD}
            aria-invalid={Boolean(state.fieldErrors.name)}
            aria-describedby={state.fieldErrors.name ? errorId("name") : undefined}
          />
          <FieldError id={errorId("name")} message={state.fieldErrors.name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={fieldId("email")} className={LABEL}>
            Email address
          </Label>
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className={FIELD}
            aria-invalid={Boolean(state.fieldErrors.email)}
            aria-describedby={state.fieldErrors.email ? errorId("email") : undefined}
          />
          <FieldError id={errorId("email")} message={state.fieldErrors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={fieldId("phone")} className={LABEL}>
            Phone{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+92 300 0000000"
            className={FIELD}
            aria-invalid={Boolean(state.fieldErrors.phone)}
            aria-describedby={state.fieldErrors.phone ? errorId("phone") : undefined}
          />
          <FieldError id={errorId("phone")} message={state.fieldErrors.phone} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={fieldId("topic")} className={LABEL}>
            What is this about?
          </Label>
          <div className="relative">
            <select
              id={fieldId("topic")}
              name="topic"
              required
              defaultValue=""
              className={SELECT}
              aria-invalid={Boolean(state.fieldErrors.topic)}
              aria-describedby={
                state.fieldErrors.topic ? errorId("topic") : undefined
              }
            >
              <option value="" disabled>
                Select a topic
              </option>
              {enquiryTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          <FieldError id={errorId("topic")} message={state.fieldErrors.topic} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={fieldId("message")} className={LABEL}>
          Message
        </Label>
        <Textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          placeholder="Tell us how we can help."
          className={TEXTAREA}
          aria-invalid={Boolean(state.fieldErrors.message)}
          aria-describedby={
            state.fieldErrors.message ? errorId("message") : undefined
          }
        />
        <FieldError id={errorId("message")} message={state.fieldErrors.message} />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full text-base font-semibold shadow-soft sm:w-auto sm:px-9"
      >
        {pending && <LoaderCircleIcon className="size-4 animate-spin" />}
        {pending ? "Sending…" : "Send message"}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        We use your details only to reply to this enquiry. They are never shared
        with third parties.
      </p>
    </form>
  );
}
