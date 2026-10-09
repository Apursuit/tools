import { defineStore } from 'pinia';
import _ from 'lodash';
import type { PaletteOption } from './command-palette.types';
import { useToolStore } from '@/tools/tools.store';
import { useFuzzySearch } from '@/composable/fuzzySearch';
import { useStyleStore } from '@/stores/style.store';
import { translate } from '@/plugins/i18n.plugin';

import SunIcon from '~icons/mdi/white-balance-sunny';
import GithubIcon from '~icons/mdi/github';
import BugIcon from '~icons/mdi/bug-outline';
import DiceIcon from '~icons/mdi/dice-5';
import InfoIcon from '~icons/mdi/information-outline';

export const useCommandPaletteStore = defineStore('command-palette', () => {
  const toolStore = useToolStore();
  const styleStore = useStyleStore();
  const router = useRouter();
  const searchPrompt = ref('');

  const toolsOptions = toolStore.tools.map(tool => ({
    ...tool,
    to: tool.path,
    toolCategory: tool.category,
    category: translate('commands.categories.tools'),
  }));

  const searchOptions: PaletteOption[] = [
    ...toolsOptions,
    {
      name: translate('commands.randomTool.name'),
      description: translate('commands.randomTool.description'),
      action: () => {
        const { path } = _.sample(toolStore.tools)!;
        router.push(path);
      },
      icon: DiceIcon,
      category: translate('commands.categories.tools'),
      keywords: ['random', 'tool', 'pick', 'choose', 'select', '随机'],
      closeOnSelect: true,
    },
    {
      name: translate('commands.toggleDarkMode.name'),
      description: translate('commands.toggleDarkMode.description'),
      action: () => styleStore.toggleDark(),
      icon: SunIcon,
      category: translate('commands.categories.actions'),
      keywords: ['dark', 'theme', 'toggle', 'mode', 'light', 'system', '深色', '主题'],
    },
    {
      name: translate('commands.githubRepository.name'),
      href: 'https://github.com/CorentinTh/it-tools',
      category: translate('commands.categories.external'),
      description: translate('commands.githubRepository.description'),
      keywords: ['github', 'repo', 'repository', 'source', 'code', '仓库', '源码'],
      icon: GithubIcon,
    },
    {
      name: translate('commands.reportBug.name'),
      description: translate('commands.reportBug.description'),
      href: 'https://github.com/CorentinTh/it-tools/issues/new/choose',
      category: translate('commands.categories.actions'),
      keywords: ['report', 'issue', 'bug', 'problem', 'error', '反馈', '问题'],
      icon: BugIcon,
    },
    {
      name: translate('commands.about.name'),
      description: translate('commands.about.description'),
      to: '/about',
      category: translate('commands.categories.pages'),
      keywords: ['about', 'learn', 'more', 'info', 'information', '关于'],
      icon: InfoIcon,
    },
  ];

  const { searchResult } = useFuzzySearch({
    search: searchPrompt,
    data: searchOptions,
    options: {
      keys: [{ name: 'name', weight: 2 }, 'description', 'keywords', 'category'],
      threshold: 0.3,
    },
  });

  const filteredSearchResult = computed(() =>
    _.chain(searchResult.value).groupBy('category').mapValues(categoryOptions => _.take(categoryOptions, 5)).value());

  return {
    filteredSearchResult,
    searchPrompt,
  };
});
