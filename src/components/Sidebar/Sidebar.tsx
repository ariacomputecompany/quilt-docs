import type { NavNode } from '@mintlify/astro/helpers';
import { unwrapNav } from '@mintlify/astro/helpers';
import type { SidebarItemStyle } from './types';
import { SidebarEntries } from './SidebarEntries';
import { SidebarLinks } from './SidebarLinks';

interface SidebarProps {
  navigation: NavNode;
  currentPath: string;
  sidebarItemStyle?: SidebarItemStyle;
  showDivider?: boolean;
}

export default function Sidebar({
  navigation,
  currentPath,
  sidebarItemStyle = 'container',
  showDivider = false,
}: SidebarProps) {
  const entries = unwrapNav(navigation, currentPath);

  return (
    <div className="app-sidebar hidden lg:flex flex-col sticky top-20 h-[calc(100vh-5rem)] w-[18rem] shrink-0 isolate">
      <nav className="relative lg:text-sm lg:leading-6 flex-1 overflow-y-auto pr-8 pb-10">
        <div className="app-sidebar-top-fade sticky top-0 h-8 z-5 bg-linear-to-b from-white" />

        <SidebarLinks />

        <SidebarEntries
          entries={entries}
          currentPath={currentPath}
          sidebarItemStyle={sidebarItemStyle}
          showDivider={showDivider}
        />
      </nav>
    </div>
  );
}
