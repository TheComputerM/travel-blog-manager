import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { SolidMarkdown } from "solid-markdown";
import { Container, Divider, HStack, Stack } from "styled-system/jsx";
import { Button } from "./ui/button";
import { FormLabel } from "./ui/form-label";
import { Heading } from "./ui/heading";
import { Input } from "./ui/input";
import { SelectLLM } from "./select-llm";
import { TbPlus, TbRefresh } from "solid-icons/tb";
import { IconButton } from "./ui/icon-button";
import { BlogImages } from "./blog-images";

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
    images: string[];
  }>({
    sections: [],
    images: [],
  });

  async function generateBlogSection(i: number) {
    setOutput(
      "sections",
      [i],
      null
    );
    const section = input.sections[i];
    const response = await fetch(`http://localhost:8000/${section.model}`, {
      method: "POST",
      body: JSON.stringify({
        title: input.title,
        section: section.title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const output = await response.json();
    setOutput("sections", [i], output);
  }

  async function generateBlog() {
    try {
      await Promise.allSettled(input.sections.map((_, i) => generateBlogSection(i)));
    } catch (e) {
      console.log(e);
    }
  }

  async function generateImages() {
    const response = await fetch(`http://localhost:8000/images/pexels?location=${encodeURIComponent(input.title)}`);
    const data = await response.json();
    setOutput("images", data);
  }

  return (
    <>
      <Container>
        <Stack gap="6">
          <Stack gap="1.5">
            <FormLabel>Location</FormLabel>
            <Input
              value={input.title}
              onChange={(e) => setInput("title", e.currentTarget.value)}
              name="title"
              placeholder="Example: Goa"
            />
          </Stack>
          <Stack gap="3">
            <HStack alignItems="center" justifyContent="space-between">
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
                <TbPlus />
                Add
              </Button>
            </HStack>
            <Stack gap="4">
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
                    <IconButton onClick={() => generateBlogSection(i())}>
                      <TbRefresh />
                    </IconButton>
                  </HStack>
                )}
              </For>
            </Stack>
          </Stack>
          <HStack>
            <Button onClick={generateBlog} flexGrow={1}>
              Create Blog
            </Button>
            <Button variant="outline" onClick={generateImages}>
              Generate Images
            </Button>
          </HStack>
        </Stack>
      </Container>
      <Divider my="6" />
      <Container>
        <Heading textStyle="2xl">{input.title}</Heading>
        <br />
        <BlogImages images={output.images} />
        <br />
        <For each={output.sections}>
          {(content) => (
            <>
              <Show when={content} fallback="...">
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
