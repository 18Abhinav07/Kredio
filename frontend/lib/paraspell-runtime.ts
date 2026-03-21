"use client";

let builderPromise: Promise<any> | null = null;

export async function loadBuilder() {
  if (!builderPromise) {
    builderPromise = new Promise(async (resolve) => {
      // force runtime separation
      await new Promise((r) => setTimeout(r, 0));

      const mod = await import("@paraspell/sdk-pjs");
      resolve(mod.Builder);
    });
  }

  return builderPromise;
}
