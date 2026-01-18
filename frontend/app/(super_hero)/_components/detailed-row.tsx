type Props = {
  label: string;
  value?: string | string[] | null;
};

export function DetailedRow({ label, value }: Props) {
  if (!value || (Array.isArray(value) && value.length === 0)) return <></>;

  return (
    <div className="flex gap-2 text-sm">
      <span className="font-medium text-muted-foreground w-40">{label}</span>
      <span className="flex-1">
        {!!value && value !== "null"
          ? Array.isArray(value)
            ? value.join(" / ")
            : value
          : "-"}
      </span>
    </div>
  );
}
