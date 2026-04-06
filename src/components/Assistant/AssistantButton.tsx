import { Icon } from '@mintlify/components';
import { toggleAssistant } from './events';

export function AssistantButton() {
  return (
    <button
      onClick={toggleAssistant}
      type="button"
      className="app-assistant-trigger flex items-center justify-center gap-1.5 pl-3 pr-3.5 h-9 rounded-xl shadow-sm transition-all"
      aria-label="Toggle AI Assistant"
    >
      <Icon
        icon="sparkles"
        iconLibrary="lucide"
        size={16}
        color="var(--primary)"
        className="shrink-0"
      />
      <span className="text-sm whitespace-nowrap">Ask AI</span>
    </button>
  );
}
