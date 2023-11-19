import React from "react";
import satori from "satori";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import fs from "node:fs/promises";
import path from "node:path";
import * as emojis from "./emoji";

import InterRegular from "@fontsource/inter/files/inter-latin-400-normal.woff";
import InterMedium from "@fontsource/inter/files/inter-latin-500-normal.woff";
import InterSemibold from "@fontsource/inter/files/inter-latin-600-normal.woff";
import InterBold from "@fontsource/inter/files/inter-latin-700-normal.woff";

let isWasmInit = false;

const dimensions = {
  width: 1200,
  height: 630,
};

interface GenerateOgImage {
  title: string;
  subtitle: string;
}

export async function generateOgImage({ title, subtitle }: GenerateOgImage) {
  if (!isWasmInit) {
    await initWasm(
      fs.readFile(path.join(process.cwd(), "./node_modules/@resvg/resvg-wasm/index_bg.wasm")),
    );
    isWasmInit = true;
  }

  const markup = (
    <div tw="flex p-10 h-full w-full bg-white flex-col">
      <header tw="flex items-center w-full">
        <svg tw="rounded-full h-24 w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path d="M 0 0 L 100 100 L 0 100" fill="#1e9afe" />
          <path d="M 0 0 h 100 v 100" fill="#ff2928" />
          <circle cx="48" cy="50" r="17.5" fill="#7b1ea2" stroke="white" stroke-width="5" />
          <path d="M 65.5 31 v 38" stroke-width="5" stroke="white" />
        </svg>

        <div tw="ml-5 font-semibold text-5xl">armaan</div>
      </header>

      <main tw="flex grow pb-3 flex-col justify-center">
        <div tw="flex">
          <div
            tw="text-8xl pb-5 pr-5 font-bold rounded-md leading-1.25 text-transparent"
            style={{
              backgroundImage: "linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%)",
              backgroundClip: "text",
            }}
          >
            {title}
          </div>
        </div>

        <div tw="mt-5 flex text-5xl text-gray-500">{subtitle}</div>
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
    // @ts-expect-error - You can return promises with this but the TS type thinks you can't
    loadAdditionalAsset: async (code, text) => {
      if (code === "emoji") {
        // It's an emoji, load the image.
        return (
          `data:image/svg+xml;base64,` +
          Buffer.from(await emojis.loadEmoji("twemoji", emojis.getIconCode(text))).toString(
            "base64",
          )
        );
      }
    },
  });

  const image = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: dimensions.width,
    },
  }).render();

  return image.asPng();
}
