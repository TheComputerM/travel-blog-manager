import { Index, Show } from "solid-js";
import * as Carousel from "~/components/ui/carousel";
import { styled } from "styled-system/jsx";
import { TbChevronLeft, TbChevronRight } from "solid-icons/tb";
export const BlogImages = (props: { images: string[] }) => (
  <Show when={props.images.length > 0}>
    <Carousel.Root>
      <Carousel.Viewport>
        <Carousel.ItemGroup>
          <Index each={props.images}>
            {(image, i) => (
              <Carousel.Item index={i}>
                <styled.img
                  src={image()}
                  objectFit="contain"
                  width="full"
                  height="300px"
                />
              </Carousel.Item>
            )}
          </Index>
        </Carousel.ItemGroup>
        <Carousel.Control>
          <Carousel.PrevTrigger>
            <TbChevronLeft />
          </Carousel.PrevTrigger>
          <Carousel.IndicatorGroup>
            <Index each={props.images}>
              {(_, i) => <Carousel.Indicator index={i} />}
            </Index>
          </Carousel.IndicatorGroup>
          <Carousel.NextTrigger>
            <TbChevronRight />
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Viewport>
    </Carousel.Root>
  </Show>
);
