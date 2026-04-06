import { Icon } from '@mintlify/components';
import { openSearch } from './SearchBar';
import { toggleAssistant } from './Assistant/events';
import { ThemeToggle } from './ThemeToggle';

export function MobileActionButtons() {
  return (
    <div className="flex lg:hidden items-center gap-2">
      <button
        type="button"
        className="app-mobile-action w-8 h-8 flex items-center justify-center"
        onClick={openSearch}
        aria-label="Search"
      >
        <Icon
          icon="search"
          iconLibrary="lucide"
          size={16}
          color="currentColor"
        />
      </button>
      <button
        type="button"
        className="app-mobile-action w-8 h-8 flex items-center justify-center"
        onClick={toggleAssistant}
        aria-label="AI Assistant"
      >
        <Icon
          icon="sparkles"
          iconLibrary="lucide"
          size={16}
          color="currentColor"
        />
      </button>
      <ThemeToggle client:load />
    </div>
  );
}

export function MobileNavToggle({
  pageTitle,
  groupName,
}: {
  pageTitle: string;
  groupName?: string;
}) {
  const handleToggle = () => {
    window.dispatchEvent(new CustomEvent('toggle-mobile-sidebar'));
  };

  return (
    <button
      type="button"
      className="app-mobile-nav-toggle flex items-center h-14 py-4 lg:px-[5vw] lg:hidden focus:outline-0 w-full text-left"
      onClick={handleToggle}
    >
      <div className="app-mobile-action flex items-center">
        <span className="sr-only">Navigation</span>
        <Icon icon="menu" iconLibrary="lucide" size={18} />
      </div>
      <div className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3 overflow-hidden">
        {groupName && (
          <div className="app-mobile-nav-group flex items-center space-x-3 shrink-0">
            <span>{groupName}</span>
            <Icon
              icon="chevron-right"
              iconLibrary="lucide"
              size={16}
              className="app-context-icon"
            />
          </div>
        )}
        <div className="app-mobile-nav-title font-semibold truncate min-w-0 flex-1">
          {pageTitle}
        </div>
      </div>
    </button>
  );
}
