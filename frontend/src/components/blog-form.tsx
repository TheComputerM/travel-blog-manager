import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { FormLabel } from "./ui/form-label";
import { Input } from "./ui/input";
import { createStore } from "solid-js/store";
import { For, Index, Show } from "solid-js";
import { Button } from "./ui/button";
import { styled } from "styled-system/jsx";
import * as Select from "~/components/ui/select";
import { TbChevronDown, TbCheck } from "solid-icons/tb";
import { Portal } from "solid-js/web";
import { Heading } from "./ui/heading";
import { SolidMarkdown } from "solid-markdown";

const SelectLLM = (props: Partial<Select.RootProps>) => {
  const items = [
    { value: "gemini", label: "Gemini" },
    { value: "mistral", label: "Mistral" },
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

export const BlogForm = () => {
  const [input, setInput] = createStore<{
    title: string;
    sections: {
      title: string;
      model: string;
    }[];
  }>({ title: "", sections: [] });

  const [output, setOutput] = createStore<{
    sections: (string | null)[];
  }>({
    sections: [],
  });

  return (
    <>
      <Container>
        <Stack gap="6">
          <styled.form
            display="contents"
            onSubmit={async (e) => {
              e.preventDefault();
              setOutput(
                "sections",
                input.sections.map(() => null)
              );

              try {
                await Promise.allSettled(
                  input.sections.map((section, i) =>
                    fetch(`http://localhost:8000/${section.model}`, {
                      method: "POST",
                      body: JSON.stringify({
                        title: input.title,
                        section: section.title
                      }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then((r) => r.json())
                      .then((r) => setOutput("sections", [i], r))
                  )
                );
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <Stack gap="1.5">
              <FormLabel>Location</FormLabel>
              <Input
                value={input.title}
                onChange={(e) => setInput("title", e.currentTarget.value)}
                name="title"
              />
            </Stack>
            <Stack gap="1.5">
              <HStack justifyContent="space-between">
                <FormLabel>Sections</FormLabel>
                <Button
                  type="button"
                  onClick={() =>
                    setInput("sections", input.sections.length, {
                      title: "",
                      model: "gemini",
                    })
                  }
                >
                  Add
                </Button>
              </HStack>
              <Stack>
                <For each={input.sections}>
                  {(section, i) => (
                    <HStack>
                      <Input
                        value={section.title}
                        placeholder="Blog section title"
                        onChange={(e) => {
                          setInput(
                            "sections",
                            [i()],
                            "title",
                            e.currentTarget.value
                          );
                        }}
                      />
                      <SelectLLM
                        onValueChange={(e) => {
                          setInput("sections", [i()], "model", e.value[0]);
                        }}
                        value={[input.sections[i()].model]}
                      />
                    </HStack>
                  )}
                </For>
              </Stack>
            </Stack>
            <Button type="submit">Create Blog</Button>
          </styled.form>
        </Stack>
      </Container>
      <Divider my="6" />
      <Container>
        <Heading textStyle="2xl">{input.title}</Heading>
        <br />
        <For each={output.sections}>
          {(content) => (
            <>
              <Show when={content} fallback="Loading...">
                <SolidMarkdown children={content!} />
              </Show>
              <Divider />
            </>
          )}
        </For>
      </Container>
    </>
  );
};
