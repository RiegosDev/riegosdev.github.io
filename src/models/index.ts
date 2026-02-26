// src/models/index.ts
import React from 'react';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: React.ReactNode;
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  duration: string;
  views: string;
  source: string;
  publishedAt: string;
  externalUrl?: string; // 🚀 Sempre esteve aqui, agora vai reinar absoluto!
  isAiGenerated?: boolean;
  width?: number;
  height?: number;
  categories?: {
    categoryId: string;
    category: Category;
  }[];
}

export interface NavItem {
  label: string;
  href: string;
}

export enum ViewMode {
  Grid = 'GRID',
  List = 'LIST',
}

// ============================================================================
// 🚀 TIPAGENS DO MOTOR DE SCRAPING (Migradas do antigo types.ts)
// ============================================================================
export interface ScraperSelectors {
  container: string;
  title: string;
  link: string;
  thumbnail: string;
  duration: string;
}

export interface ScraperSettings {
  baseUrl: string;
  categoryPath: string;
  linkIncludes: string[];
  linkExcludes: string[];
  selectors: ScraperSelectors;
  titleSelectors: string[];
  thumbSelectors: string[];
  durationSelectors: string[];
}

export type ScraperDictionary = Record<
  string,
  ScraperSettings
>;
