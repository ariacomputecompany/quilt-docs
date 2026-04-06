import { useState } from 'react';
import { Icon } from '@mintlify/components';
import type { NavGroup } from '@mintlify/astro/helpers';
import { isNavPage, isNavGroup } from '@mintlify/astro/helpers';
import type { SidebarItemStyle } from './types';
import { SideNavItem } from './SideNavItem';

interface SidebarGroupItemProps {
  group: NavGroup;
  currentPath: string;
  sidebarItemStyle?: SidebarItemStyle;
}

export function SidebarGroupItem({
  group,
  currentPath,
  sidebarItemStyle,
}: SidebarGroupItemProps) {
  const hasActiveChild = group.pages.some((entry) => {
    if (isNavPage(entry)) return entry.href === currentPath;
    if (isNavGroup(entry)) return groupHasActiveChild(entry, currentPath);
    return false;
  });
  const [isOpen, setIsOpen] = useState(hasActiveChild || true);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="app-sidebar-group-toggle flex w-full items-center gap-2.5 pl-4 pr-3 mb-3.5 lg:mb-2.5 font-semibold text-left"
        aria-expanded={isOpen}
      >
        <span className="app-sidebar-group-title flex items-center gap-2.5 min-w-0 flex-1">
          {group.icon && (
            <Icon
              icon={group.icon}
              iconLibrary="lucide"
              className="h-3.5 w-3.5 bg-current shrink-0"
              overrideColor={true}
              size={14}
            />
          )}
          <h5 className="truncate">{group.group}</h5>
        </span>
        <Icon
          icon="chevron-down"
          iconLibrary="lucide"
          size={14}
          className={isOpen ? 'rotate-0' : '-rotate-90'}
        />
      </button>

      {isOpen && (
        <ul className="app-sidebar-group-list">
          {group.pages.map((entry) => {
            if (isNavPage(entry)) {
              return (
                <SideNavItem
                  key={entry.href}
                  page={entry}
                  currentPath={currentPath}
                  sidebarItemStyle={sidebarItemStyle}
                />
              );
            }
            if (isNavGroup(entry)) {
              return (
                <li key={entry.group} className="app-sidebar-subgroup">
                  <SidebarGroupItem
                    group={entry}
                    currentPath={currentPath}
                    sidebarItemStyle={sidebarItemStyle}
                  />
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </>
  );
}

function groupHasActiveChild(group: NavGroup, currentPath: string): boolean {
  return group.pages.some((entry) => {
    if (isNavPage(entry)) return entry.href === currentPath;
    if (isNavGroup(entry)) return groupHasActiveChild(entry, currentPath);
    return false;
  });
}
