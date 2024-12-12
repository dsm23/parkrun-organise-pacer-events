import { useId } from "react";
import type { ReactNode } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/utils/cn";

type Props = {
  checked?: boolean;
  children: ReactNode;
};

const CheckboxWithLabel = ({ checked, children }: Props) => {
  const id = useId();

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} />
      <Label
        htmlFor={id}
        className={cn({
          "text-muted-foreground line-through": checked,
        })}
      >
        {children}
      </Label>
    </div>
  );
};

export default function Roadmap() {
  return (
    <div className="grid p-10">
      <div className="space-y-4">
        <h1 className="text-2xl font-medium">Roadmap</h1>
        <Separator />
        <CheckboxWithLabel checked>Add Google login</CheckboxWithLabel>
        <CheckboxWithLabel checked>
          Add active styles to sidebar links
        </CheckboxWithLabel>
        <CheckboxWithLabel>Add profile page</CheckboxWithLabel>
        <CheckboxWithLabel>Fix sign out button in sidebar</CheckboxWithLabel>
        <CheckboxWithLabel>Fix calendar month view</CheckboxWithLabel>
        <CheckboxWithLabel>Add calendar day view</CheckboxWithLabel>
        <CheckboxWithLabel>
          Add option to change default location from Southend
        </CheckboxWithLabel>
        <CheckboxWithLabel>Include parkrun ID</CheckboxWithLabel>
        <CheckboxWithLabel>Include parkrun personal best</CheckboxWithLabel>
        <CheckboxWithLabel>
          Add double click on volunteer event to alter
        </CheckboxWithLabel>
        <CheckboxWithLabel>Add GDPR policy</CheckboxWithLabel>
        <CheckboxWithLabel>Add 2FA authentication</CheckboxWithLabel>
        <CheckboxWithLabel>Facebook login</CheckboxWithLabel>
        <CheckboxWithLabel>Microsoft login</CheckboxWithLabel>
        <CheckboxWithLabel>Apple login</CheckboxWithLabel>
        <CheckboxWithLabel>GitHub login</CheckboxWithLabel>
      </div>
    </div>
  );
}
