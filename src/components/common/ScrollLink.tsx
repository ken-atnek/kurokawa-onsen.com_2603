'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  /** 同一ページ時のスクロールをスムーズにする */
  smooth?: boolean;
  /** スクロール先（基本は0でOK） */
  top?: number;
};

const normalizePath = (href: LinkProps['href']): string | null => {
  if (typeof href === 'string') {
    // "/works/?a=1#x" → "/works/"
    const noHash = href.split('#')[0] ?? href;
    const noQuery = noHash.split('?')[0] ?? noHash;
    return noQuery;
  }
  // UrlObject
  return href.pathname ?? null;
};

// ★ 追加：末尾スラッシュを除去して比較用に正規化
const normalizeTrailingSlash = (path: string): string => {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
};

const getHash = (href: LinkProps['href']): string | null => {
  if (typeof href !== 'string') return null;
  const parts = href.split('#');
  if (parts.length < 2) return null;
  const hash = parts[1];
  return hash ? `#${hash}` : null;
};

export default function ScrollLink({
  href,
  children,
  className,
  smooth = true,
  top = 0,
  ...rest
}: Props) {
  const pathname = usePathname();
  const targetPath = normalizePath(href);
  const targetHash = getHash(href);

  // ★ 比較用に正規化
  const currentPath = normalizeTrailingSlash(pathname);
  const compareTargetPath = targetPath
    ? normalizeTrailingSlash(targetPath)
    : null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // 同一ページなら「遷移」ではなく「スクロール」扱いにする
    if (compareTargetPath && currentPath === compareTargetPath) {
      e.preventDefault();

      // ハッシュがあれば、その要素へスクロール
      if (targetHash) {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
          return;
        }
      }

      // ハッシュが無い場合はトップへ
      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  return (
    <Link
      href={href}
      className={className}
      scroll
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
