import { RenderResult } from "@testing-library/react";

export function getById(renderResult: RenderResult, id: string) {
  return renderResult.container.querySelector(`#${id}`);
}