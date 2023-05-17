import { Switch as Swtch } from "@headlessui/react";
import { FC } from "react";

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <Swtch.Group>
      <div className="flex items-center justify-between">
        <Swtch.Label className="text-gray-700 dark:text-gray-300 mr-4">
          {label}
        </Swtch.Label>
        <Swtch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? "bg-blue-600" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Swtch>
      </div>
    </Swtch.Group>
  );
};
