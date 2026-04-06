import { cn, Icon } from '@mintlify/components';
import type { NavPage } from '@mintlify/astro/helpers';
import type { SidebarItemStyle } from './types';

export interface SideNavItemProps {
  page: NavPage;
  currentPath: string;
  sidebarItemStyle?: SidebarItemStyle;
}

const ACTIVE_TEXT = 'text-(--primary) font-medium';

const sidebarStyles: Record<
  SidebarItemStyle,
  { base?: string; active: string; inactive: string }
> = {
  container: {
    base: 'rounded-xl w-full outline-offset-[-1px]',
    active: `bg-(--primary)/10 ${ACTIVE_TEXT}`,
    inactive: '',
  },
  card: {
    base: 'ml-4 border-l outline-offset-[-1px]',
    active: `border-(--primary) bg-(--primary)/10 ${ACTIVE_TEXT}`,
    inactive: '',
  },
  border: {
    base: 'ml-4 border-l py-2 lg:py-1.5 w-[calc(100%-1rem)]',
    active: `border-(--primary) ${ACTIVE_TEXT}`,
    inactive: '',
  },
  undecorated: {
    active: `border-(--primary) ${ACTIVE_TEXT}`,
    inactive: '',
  },
  arrow: {
    active: `border-(--primary) ${ACTIVE_TEXT}`,
    inactive: '',
  },
  plain: {
    active: ACTIVE_TEXT,
    inactive: '',
  },
};

export function SideNavItem({
  page,
  currentPath,
  sidebarItemStyle = 'container',
}: SideNavItemProps) {
  const isActive = page.href === currentPath;
  const title = page.title;
  const isOneWord = title.split(' ').length === 1;
  const variant = sidebarStyles[sidebarItemStyle];

  return (
    <li className="relative scroll-m-4 first:scroll-m-20" data-title={title}>
      <a
        href={page.href}
        className={cn(
          'app-sidebar-link group flex items-center pl-4 pr-3 py-1.5 cursor-pointer gap-x-3 text-left',
          isOneWord && 'wrap-break-word hyphens-auto',
          variant.base,
          isActive ? variant.active : variant.inactive,
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {sidebarItemStyle === 'arrow' && isActive && (
          <Icon
            icon="chevron-right"
            iconLibrary="lucide"
            className="absolute left-0 text-(--primary) group-hover:text-(--primary)"
            size={16}
          />
        )}
        {page.icon && (
          <span
            className={cn(
              'app-sidebar-page-icon w-5 h-5 p-0.5 inline-flex items-center justify-center rounded border',
              isActive && 'is-active',
            )}
          >
            <Icon
              icon={page.icon}
              iconLibrary="lucide"
              className={cn(isActive && 'text-white')}
              overrideColor
              size={12}
            />
          </span>
        )}
        <span className="flex-1 truncate min-w-0">{title}</span>
        {page.deprecated && (
          <span className="app-sidebar-badge shrink-0 text-xs font-medium px-2 py-0.5 rounded-md border">
            Deprecated
          </span>
        )}
      </a>
    </li>
  );
}
