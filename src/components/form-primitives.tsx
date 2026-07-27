/**
 * Shared styling for the public-facing forms. shadcn inputs default to a
 * compact 32px height, which is too tight for forms members of the public
 * fill in on a phone.
 */
export const FIELD =
  "h-12 rounded-xl border-input bg-background px-4 text-base shadow-xs md:text-sm";

export const TEXTAREA =
  "rounded-xl border-input bg-background px-4 py-3 text-base shadow-xs md:text-sm";

export const LABEL = "text-sm font-semibold text-foreground";

export const SELECT = [
  FIELD,
  "w-full appearance-none border pr-11 transition-colors",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
].join(" ");

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-medium text-destructive">
      {message}
    </p>
  );
}
