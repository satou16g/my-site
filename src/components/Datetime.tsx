import { LOCALE } from "@config";

interface DatetimesProps {
  pubDatetime: string | Date;
}

interface Props extends DatetimesProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  size = "sm",
  className,
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <span className={`italic ${size === "sm" ? "text-xs" : "text-sm"}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
        />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime }: DatetimesProps) => {
  const myDatetime = new Date(pubDatetime);

  const date = myDatetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = myDatetime.toLocaleTimeString(LOCALE.langTag, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <time dateTime={myDatetime.toISOString()}>{date}</time>
  );
};
