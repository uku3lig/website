export function getName(site: URL | undefined) {
  return site?.hostname === "julie.moe" ? "julie" : "uku";
}
