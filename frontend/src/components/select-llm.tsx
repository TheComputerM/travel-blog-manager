import * as Select from "~/components/ui/select";
import { Index, Portal } from "solid-js/web";
import { TbCheck, TbChevronDown } from "solid-icons/tb";

export const SelectLLM = (props: Partial<Select.RootProps>) => {
  const items = [
    { value: "gemini", label: "Gemini" },
    { value: "gemini-alt", label: "Gemini Alt" },
    { value: "mistral", label: "Mistral" },
    { value: "falcon", label: "Falcon" },
  ];
  return (
    <Select.Root
      positioning={{ sameWidth: true }}
      {...props}
      items={items}
      width="xs"
      defaultValue={["gemini"]}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
          <TbChevronDown />
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Index each={items}>
              {(item) => (
                <Select.Item item={item()}>
                  <Select.ItemText>{item().label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <TbCheck />
                  </Select.ItemIndicator>
                </Select.Item>
              )}
            </Index>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
