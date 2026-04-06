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
];

export function SidebarLinks() {
  return (
    <div className="mb-5 pl-4 pr-2">
      <h5 className="app-sidebar-group-title font-semibold text-xs uppercase tracking-wider mb-2 opacity-50">
        Links
      </h5>
      <div className="flex flex-col gap-0.5">
        <HealthCheck />
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="app-sidebar-link flex items-center py-1 text-sm"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
