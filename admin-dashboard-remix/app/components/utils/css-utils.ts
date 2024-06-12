export function getActiveClassName(isActive: boolean) {
  if (isActive) {
    return "text-foreground transition-colors hover:text-foreground";
  } else {
    return "text-muted-foreground transition-colors hover:text-foreground";
  }
}
