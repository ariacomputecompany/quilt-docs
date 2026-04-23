import { HealthCheck } from './HealthCheck';

interface LinkItem {
  name: string;
  href: string;
}

const links: LinkItem[] = [
  {
    name: 'Open Source',
    href: 'https://github.com/ariacomputecompany',
  },
  {
    name: 'Get an API Key',
    href: 'https://quilt.sh/auth2api',
  },
];

export function SidebarLinks() {
  return (
    <div className="mb-5 pr-2">
      <h5 className="app-sidebar-group-title font-semibold text-xs uppercase tracking-wider mb-2 opacity-50 pl-4">
        Links
      </h5>
      <div className="flex flex-col gap-0.5 ml-4 pl-2 border-l border-[var(--app-border)]">
        <HealthCheck />
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="app-sidebar-link flex items-center py-1 text-[0.8125rem]"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
