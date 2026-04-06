import { useState } from 'react';
import { Icon, cn } from '@mintlify/components';
import {
  useContextualOptions,
  type ContextualOptionItem,
} from '../hooks/useContextualOptions';

type CopyState = 'idle' | 'copying' | 'copied' | 'error';

interface PageContextMenuProps {
  pathname: string;
  options?: string[];
  className?: string;
}

export function PageContextMenu({
  pathname,
  options: configOptions,
  className,
}: PageContextMenuProps) {
  const markdownPath = pathname === '/' ? '/index' : pathname;

  const { options } = useContextualOptions({
    pathname: markdownPath,
    options: configOptions,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  if (!options.length) return null;

  const handleAction = async (option: ContextualOptionItem) => {
    setIsOpen(false);
    if (option.id === 'copy') {
      setCopyState('copying');
      try {
        const result = await option.action();
        setCopyState(result === false ? 'error' : 'copied');
      } catch {
        setCopyState('error');
      }
      setTimeout(() => setCopyState('idle'), 2000);
    } else {
      option.action();
    }
  };

  const copyText =
    copyState === 'copying'
      ? 'Copying...'
      : copyState === 'copied'
        ? 'Copied!'
        : copyState === 'error'
          ? 'Error'
          : 'Copy page';

  const firstOption = options[0];

  return (
    <div className={cn('relative flex items-center shrink-0', className)}>
      <div className="flex items-stretch h-9 relative z-20">
        {firstOption && (
          <button
            className={cn(
              'app-context-primary rounded-l-xl px-3 border transition-colors h-full',
              options.length === 1 ? 'rounded-xl' : 'border-r-0',
            )}
            onClick={() => void handleAction(firstOption)}
            disabled={copyState === 'copying'}
            aria-label={firstOption.title}
          >
            <div className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              {firstOption.icon && (
                <firstOption.icon className="app-context-icon w-4 h-4" />
              )}
              <span>
                {firstOption.id === 'copy' ? copyText : firstOption.title}
              </span>
            </div>
          </button>
        )}
        {options.length > 1 && (
          <button
            className="app-context-toggle rounded-r-xl border aspect-square h-full flex items-center justify-center transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="More actions"
          >
            <Icon
              icon="chevron-down"
              iconLibrary="lucide"
              size={16}
              color="currentColor"
              className={cn(
                'app-context-icon transition-transform',
                isOpen && 'rotate-180',
              )}
            />
          </button>
        )}
      </div>
      {isOpen && options.length > 1 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="app-context-menu rounded-2xl absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-auto min-w-[280px] sm:w-64 border z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => void handleAction(option)}
                className="app-context-item w-full flex items-center gap-2 px-3 py-2 text-left"
              >
                <div className="app-context-iconbox border rounded-md p-1.5">
                  {option.icon && (
                    <option.icon className="app-context-icon w-4 h-4" />
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="app-context-title text-sm font-medium flex items-center gap-1">
                    {option.title}
                    {option.externalLink && (
                      <Icon
                        icon="arrow-up-right"
                        iconLibrary="lucide"
                        size={12}
                        color="currentColor"
                        className="app-context-icon"
                      />
                    )}
                  </div>
                  <div className="app-context-label-secondary text-xs mt-0.5">
                    {option.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
