import type { ButtonHTMLAttributes, ComponentType, ReactNode } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { MdOutlineInbox } from "react-icons/md";

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

/* ---------------- Button ---------------- */
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-indigo-500 text-white hover:brightness-110 disabled:brightness-75",
  secondary: "bg-gray-700 text-white hover:bg-gray-600",
  outline: "border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
  ghost: "text-gray-400 hover:bg-gray-700 hover:text-white",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
    />
  );
}

/* ---------------- Card ---------------- */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg", className)}>{children}</div>;
}

export function CardTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold text-white">{children}</h3>
      {right}
    </div>
  );
}

/* ---------------- Page header ---------------- */
export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  actions,
}: {
  icon: ComponentType<{ className?: string; size?: number }>;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <Icon className="shrink-0 text-indigo-500" size={32} />
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

/* ---------------- Misc ---------------- */
export function Spinner({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cx("flex items-center gap-3 text-gray-400", className)} role="status">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-600 border-t-indigo-500" />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
      <FaExclamationCircle className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-12 text-center">
      <MdOutlineInbox className="text-indigo-500" size={44} />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {children && <p className="max-w-md text-sm text-gray-400">{children}</p>}
      {action}
    </Card>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      className={cx("h-2 w-full overflow-hidden rounded-full bg-gray-700", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-indigo-500 transition-all duration-700" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-indigo-500/50 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-500">
      {children}
    </span>
  );
}

export const inputClass =
  "w-full rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

export { cx };
