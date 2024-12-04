import { FormDataType } from "@/types";
import RadioField from "../components/RadioField";

interface EventScopeProps {
  value: FormDataType["eventScope"];
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function EventScope({
  value,
  onChange
}: EventScopeProps) {
  return(
    <RadioField
      items={[
        "Local",
        "National",
        "International",
      ]}
      onSelectItem={(value: string) => onChange("eventScope", value)}
      value={value}
    />
  )
}
