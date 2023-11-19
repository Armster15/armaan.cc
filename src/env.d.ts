/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import "react";

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    /** ⚠️ Only for use with Satori */
    tw?: string;
  }
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    /** ⚠️ Only for use with Satori */
    tw?: string;
  }
}
