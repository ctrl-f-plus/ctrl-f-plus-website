// src/lib/nav.ts

function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function isNavItemActive(currentPath: string, itemHref: string): boolean {
  // usePathname() never includes the host or the hash, so these links can't be matched.
  const isInternalRoute = itemHref.startsWith('/') && !itemHref.includes('#');
  if (!isInternalRoute) return false;

  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedItemHref = normalizePath(itemHref);
  if (normalizedItemHref === '/') return normalizedCurrentPath === '/';

  return (
    normalizedCurrentPath === normalizedItemHref ||
    normalizedCurrentPath.startsWith(`${normalizedItemHref}/`)
  );
}
