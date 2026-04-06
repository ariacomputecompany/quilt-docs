import { Icon } from '@mintlify/components';
import { MintlifyLogo } from '../icons/MintlifyLogo';

const socials = [
  { type: 'x', url: 'https://x.com/mintlify' },
  { type: 'github', url: 'https://github.com/mintlify' },
  { type: 'linkedin', url: 'https://linkedin.com/company/mintlify' },
];

const socialIconMap: Record<string, string> = {
  x: 'x-twitter',
  github: 'github',
  linkedin: 'linkedin',
};

export default function SiteFooter() {
  return (
    <footer className="app-site-footer border-t mt-24">
      <div className="flex gap-12 justify-between items-center py-10">
        <div className="flex gap-6 flex-wrap">
          {socials.map((social) => {
            const iconName =
              socialIconMap[social.type.toLowerCase()] || social.type;
            return (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="app-social-link transition-colors"
                aria-label={social.type}
              >
                <Icon icon={iconName} size={20} color="currentColor" />
              </a>
            );
          })}
        </div>
        <div className="app-powered-by flex items-center gap-1 text-sm transition-colors">
          <a
            href="https://www.mintlify.com?utm_campaign=poweredBy&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline gap-1"
          >
            <span>Powered by</span>
            <MintlifyLogo className="h-4 w-auto translate-y-[3px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
