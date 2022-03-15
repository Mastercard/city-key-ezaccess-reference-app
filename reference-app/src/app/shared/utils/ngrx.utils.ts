export function getServerError(payload: unknown): string | null {
  const { Description, Details } = (payload as any)?.error?.Errors?.Error[0] || {}
  return (Description || Details) ? `${Description} - ${Details}` : ''
}
