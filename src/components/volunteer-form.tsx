"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { CheckCircle2Icon, ChevronDownIcon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { submitVolunteerApplication } from "@/lib/actions/volunteer";
import {
  initialVolunteerState,
  volunteerInterests,
  type VolunteerState,
} from "@/lib/volunteer";
import { archiveVolunteerApplication } from "@/lib/firebase/submissions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FIELD,
  FieldError,
  LABEL,
  SELECT,
  TEXTAREA,
} from "@/components/form-primitives";

export function VolunteerForm() {
  const [state, formAction, pending] = useActionState(
    async (previous: VolunteerState, formData: FormData) => {
      const result = await submitVolunteerApplication(previous, formData);
      if (result.status === "success") await archiveVolunteerApplication(formData);
      return result;
    },
    initialVolunteerState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const baseId = useId();

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    } else if (state.status === "error" && Object.keys(state.fieldErrors).length === 0) {
      toast.error(state.message);
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-card p-12 text-center shadow-soft ring-1 ring-primary/20">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary">
          <CheckCircle2Icon className="size-8 text-primary" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Application received</h2>
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
      {/* Honeypot: hidden from users, irresistible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={fieldId("company")}>Company</label>
        <input id={fieldId("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={fieldId("name")} className={LABEL}>
            Full name
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

        <div className="space-y-2">
          <Label htmlFor={fieldId("phone")} className={LABEL}>
            Phone number
          </Label>
          <Input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+92 300 0000000"
            required
            className={FIELD}
            aria-invalid={Boolean(state.fieldErrors.phone)}
            aria-describedby={state.fieldErrors.phone ? errorId("phone") : undefined}
          />
          <FieldError id={errorId("phone")} message={state.fieldErrors.phone} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={fieldId("city")} className={LABEL}>
            City
          </Label>
          <Input
            id={fieldId("city")}
            name="city"
            autoComplete="address-level2"
            placeholder="e.g. Faisalabad"
            required
            className={FIELD}
            aria-invalid={Boolean(state.fieldErrors.city)}
            aria-describedby={state.fieldErrors.city ? errorId("city") : undefined}
          />
          <FieldError id={errorId("city")} message={state.fieldErrors.city} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={fieldId("interest")} className={LABEL}>
          Where would you like to help?
        </Label>
        <div className="relative">
          <select
            id={fieldId("interest")}
            name="interest"
            required
            defaultValue=""
            aria-invalid={Boolean(state.fieldErrors.interest)}
            aria-describedby={
              state.fieldErrors.interest ? errorId("interest") : undefined
            }
            className={SELECT}
          >
            <option value="" disabled>
              Select an area
            </option>
            {volunteerInterests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        <FieldError id={errorId("interest")} message={state.fieldErrors.interest} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={fieldId("availability")} className={LABEL}>
          Availability
        </Label>
        <Input
          id={fieldId("availability")}
          name="availability"
          placeholder="e.g. weekends, or two evenings a week"
          required
          className={FIELD}
          aria-invalid={Boolean(state.fieldErrors.availability)}
          aria-describedby={
            state.fieldErrors.availability ? errorId("availability") : undefined
          }
        />
        <FieldError
          id={errorId("availability")}
          message={state.fieldErrors.availability}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={fieldId("message")} className={LABEL}>
          Anything else?{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          placeholder="Skills, professional background, or questions for us."
          className={TEXTAREA}
        />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full text-base font-semibold shadow-soft sm:w-auto sm:px-9"
      >
        {pending && <LoaderCircleIcon className="size-4 animate-spin" />}
        {pending ? "Sending…" : "Submit application"}
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        We use your details only to contact you about volunteering. They are
        never shared with third parties.
      </p>
    </form>
  );
}
