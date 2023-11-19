import React from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import InterRegular from "@fontsource/inter/files/inter-latin-400-normal.woff";
import InterMedium from "@fontsource/inter/files/inter-latin-500-normal.woff";
import InterSemibold from "@fontsource/inter/files/inter-latin-600-normal.woff";
import InterBold from "@fontsource/inter/files/inter-latin-700-normal.woff";
import { formatDate } from "./date";

const dimensions = {
  width: 1200,
  height: 630,
};

interface GenerateOgImage {
  title: string;
  date: Date;
}

export async function generateOgImage({ title, date }: GenerateOgImage) {
  const markup = (
    <div tw="flex p-10 h-full w-full bg-white flex-col">
      <header tw="flex items-center text-[36px] w-full">
        <svg tw="rounded-full h-16 w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path d="M 0 0 L 100 100 L 0 100" fill="#1e9afe" />
          <path d="M 0 0 h 100 v 100" fill="#ff2928" />
          <circle cx="48" cy="50" r="17.5" fill="#7b1ea2" stroke="white" stroke-width="5" />
          <path d="M 65.5 31 v 38" stroke-width="5" stroke="white" />
        </svg>

        <div tw="ml-3 font-semibold">armaan</div>
      </header>

      <main tw="flex grow pb-3 flex-col justify-center">
        <div tw="flex">
          <div tw="text-7xl pb-5 font-medium rounded-md leading-1.25">{title}</div>
        </div>

        <div tw="mt-5 flex text-3xl text-gray-500">{formatDate(date)}</div>
      </main>
    </div>
  );

  const svg = await satori(markup, {
    fonts: [
      {
        name: "Inter",
        data: Buffer.from(InterRegular),
        weight: 400,
      },
      {
        name: "Inter",
        data: Buffer.from(InterMedium),
        weight: 500,
      },
      {
        name: "Inter",
        data: Buffer.from(InterSemibold),
        weight: 600,
      },
      {
        name: "Inter",
        data: Buffer.from(InterBold),
        weight: 700,
      },
    ],
    height: dimensions.height,
    width: dimensions.width,
  });

  const image = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: dimensions.width,
    },
  }).render();

  return image.asPng();
}
