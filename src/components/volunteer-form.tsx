"use client";

import { useId, useState, type FormEvent } from "react";
import { ChevronDownIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import {
  volunteerFieldErrors,
  volunteerInterests,
  volunteerSchema,
  type VolunteerFieldErrors,
} from "@/lib/volunteer";
import { volunteerMailtoHref } from "@/lib/mailto";
import { archiveVolunteerApplication } from "@/lib/firebase/submissions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
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
  const [errors, setErrors] = useState<VolunteerFieldErrors>({});
  const [draft, setDraft] = useState<string | null>(null);
  const baseId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Bots fill hidden fields; people never see this one.
    if (formData.get("company")) return;

    const parsed = volunteerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),
      interest: formData.get("interest"),
      availability: formData.get("availability"),
      message: formData.get("message"),
    });

    if (!parsed.success) {
      setErrors(volunteerFieldErrors(parsed.error.issues));
      toast.error("Please correct the highlighted fields and try again.");
      return;
    }

    setErrors({});

    // Keep a copy in Firestore where it is configured, without making the
    // visitor wait on it.
    void archiveVolunteerApplication(formData);

    const href = volunteerMailtoHref(parsed.data);
    setDraft(href);
    window.location.href = href;
  }

  if (draft) {
    return (
      <div className="rounded-2xl bg-card p-10 text-center shadow-soft ring-1 ring-primary/20 sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary">
          <MailIcon className="size-8 text-primary" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Your email is ready</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          We have opened your email app with your application filled in. Send it
          from there and it reaches us at {site.volunteerEmail}.
        </p>
        <a
          href={draft}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-7 h-11 border-border-strong px-6 font-semibold",
          )}
        >
          Open the email again
        </a>
      </div>
    );
  }

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  return (
    <form
      onSubmit={handleSubmit}
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
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("name") : undefined}
          />
          <FieldError id={errorId("name")} message={errors.name} />
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
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
          />
          <FieldError id={errorId("email")} message={errors.email} />
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
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
          />
          <FieldError id={errorId("phone")} message={errors.phone} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={fieldId("city")} className={LABEL}>
            City
          </Label>
          <Input
            id={fieldId("city")}
            name="city"
            autoComplete="address-level2"
            placeholder="e.g. Karachi"
            required
            className={FIELD}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? errorId("city") : undefined}
          />
          <FieldError id={errorId("city")} message={errors.city} />
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
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={errors.interest ? errorId("interest") : undefined}
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
        <FieldError id={errorId("interest")} message={errors.interest} />
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
          aria-invalid={Boolean(errors.availability)}
          aria-describedby={
            errors.availability ? errorId("availability") : undefined
          }
        />
        <FieldError
          id={errorId("availability")}
          message={errors.availability}
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

      <Button
        type="submit"
        className="h-12 w-full text-base font-semibold shadow-soft sm:w-auto sm:px-9"
      >
        <MailIcon className="size-4" />
        Compose email
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        This opens your own email app with the details filled in, so nothing is
        sent until you press send there.
      </p>
    </form>
  );
}
