import { Icon } from '@mintlify/components';
import { HealthCheck } from './HealthCheck';

interface LinkItem {
  name: string;
  href: string;
  icon: string;
}

const links: LinkItem[] = [
  {
    name: 'quiltc',
    href: 'https://github.com/ariacomputecompany/quiltc',
    icon: 'github',
  },
];

export function SidebarLinks() {
  return (
    <div className="mb-6 pl-4">
      <h5 className="app-sidebar-group-title font-semibold text-xs uppercase tracking-wider mb-3 pl-0 opacity-60">
        Links
      </h5>
      <div className="flex flex-col gap-1">
        <HealthCheck />
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="app-anchor-link group flex items-center lg:text-sm lg:leading-6 mb-1 font-medium outline-offset-4"
          >
            <span className="app-anchor-icon mr-3 rounded-md inline-flex items-center justify-center w-6 h-6 p-1 ring-1 ring-inset shrink-0">
              <Icon
                icon={link.icon}
                iconLibrary="lucide"
                className="group-hover:text-white"
                overrideColor
                size={14}
              />
            </span>
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
