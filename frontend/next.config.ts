import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @polkadot bundles contain `\00` octal escapes inside template literals which
  // Turbopack's SSR bundler rejects (strict-mode parse error). Mark them external
  // so Node.js loads the CJS bundles natively and bypasses the bundler.
  serverExternalPackages: ["@polkadot/api", "@polkadot/util-crypto", "@polkadot/util", "@polkadot/types", "@polkadot/rpc-provider", "@polkadot/rpc-core", "@polkadot/api-base", "@polkadot/types-known", "@polkadot/keyring"],

  output: "export",
};

export default nextConfig;
