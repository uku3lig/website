export function getName(site: URL | undefined) {
  console.log(site);
  return site?.hostname === "julie.moe" ? "julie" : "uku";
}
