import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { ShopWithStatus } from '@/types/shop';

type ShopIndexBase = {
  id: string;
  slug: string;
  category: string;
  name: string[];
  thumb: string;
  tel: string;
  leadCopy: string[];
};

type ShopStatus = {
  label: string;
  variant: string;
  key?: string;
};

type BuildOptions<TDetail> = {
  // details/{id}.json を読んだ結果（detail）から status を作る
  createStatus: (detail: TDetail, index: ShopIndexBase) => ShopStatus;

  // index.json のパス（通常はこれでOK）
  indexJsonPath?: string;

  // details json の基底パス（通常はこれでOK）
  detailsDirPath?: string;

  // 公開店舗だけに絞る等のフィルタを入れたい場合
  filterIndex?: (index: ShopIndexBase) => boolean;
};

async function readJson<T>(absolutePath: string): Promise<T> {
  const txt = await readFile(absolutePath, 'utf8');
  return JSON.parse(txt) as T;
}

function getPublicDbPath(...paths: string[]): string {
  // process.cwd() = Next.js プロジェクトルート想定
  return path.join(process.cwd(), 'public', ...paths);
}

export async function buildShopsWithStatus<TDetail>(
  options: BuildOptions<TDetail>
): Promise<ShopWithStatus[]> {
  const indexJsonPath =
    options.indexJsonPath ?? getPublicDbPath('db', 'shops', 'shopsIndex.json');
  const detailsDirPath =
    options.detailsDirPath ?? getPublicDbPath('db', 'shops', 'details');

  const indexList = await readJson<ShopIndexBase[]>(indexJsonPath);

  const filtered = options.filterIndex
    ? indexList.filter(options.filterIndex)
    : indexList;

  const results: ShopWithStatus[] = [];

  for (const index of filtered) {
    const detailPath = path.join(detailsDirPath, `${index.id}.json`);

    try {
      const detail = await readJson<TDetail>(detailPath);
      const status = options.createStatus(detail, index);

      results.push({
        ...index,
        status,
      } as ShopWithStatus);
    } catch {
      // details が無い／壊れてる等は “落とす” 方針（一覧が壊れるのを防ぐ）
      continue;
    }
  }

  return results;
}
