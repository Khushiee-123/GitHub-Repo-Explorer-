/**
 * Map of programming language names to their associated hex color.
 * Based on GitHub's linguist colors.
 */
export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  Java: '#B07219',
  Go: '#00ADD8',
  Rust: '#DEA584',
  'C++': '#F34B7D',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Scala: '#C22D40',
  Shell: '#89E051',
  Lua: '#000080',
  R: '#198CE7',
  Perl: '#0298C3',
  Haskell: '#5E5086',
  Elixir: '#6E4A7E',
  Clojure: '#DB5855',
  Erlang: '#B83998',
  Julia: '#A270BA',
  'Objective-C': '#438EFF',
  Vue: '#41B883',
  HTML: '#E34C26',
  CSS: '#563D7C',
  SCSS: '#C6538C',
  Svelte: '#FF3E00',
  Vim: '#199F4B',
  Zig: '#EC915C',
  Nix: '#7E7EFF',
  OCaml: '#3BE133',
  'F#': '#B845FC',
  Groovy: '#4298B8',
  PowerShell: '#012456',
  Dockerfile: '#384D54',
  Makefile: '#427819',
  TeX: '#3D6117',
  Jupyter: '#F37626',
  MATLAB: '#E16737',
  Assembly: '#6E4C13',
  Solidity: '#AA6746',
  HCL: '#844FBA',
  Terraform: '#5C4EE5',
  YAML: '#CB171E',
  JSON: '#292929',
  Markdown: '#083FA1',
  Other: '#8B949E',
};

/**
 * Get the hex color for a given language, falling back to a neutral grey.
 */
export function getLanguageColor(language: string | null): string {
  if (!language) return LANGUAGE_COLORS.Other;
  return LANGUAGE_COLORS[language] ?? LANGUAGE_COLORS.Other;
}
