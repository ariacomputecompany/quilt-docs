import { useState, useCallback } from 'react';
import { Icon } from '@mintlify/components';

type HealthStatus = 'idle' | 'loading' | 'success' | 'error';

export function HealthCheck() {
  const [status, setStatus] = useState<HealthStatus>('idle');
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const checkHealth = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch('https://backend.quilt.sh/health', {
        mode: 'no-cors',
      });
      if (res.type === 'opaque') {
        setStatusCode(200);
        setStatus('success');
      } else {
        setStatusCode(res.status);
        setStatus(res.ok ? 'success' : 'error');
      }
    } catch {
      setStatusCode(0);
      setStatus('error');
    }
  }, []);

  const statusColor =
    status === 'success'
      ? '#16a34a'
      : status === 'error'
        ? '#ef4444'
        : 'var(--app-text-soft)';

  return (
    <button
      type="button"
      onClick={checkHealth}
      className="app-anchor-link group flex items-center lg:text-sm lg:leading-6 mb-1 font-medium outline-offset-4 w-full cursor-pointer"
      style={{ border: 'none', background: 'none', padding: 0 }}
    >
      <span className="app-anchor-icon mr-3 rounded-md inline-flex items-center justify-center w-6 h-6 p-1 ring-1 ring-inset shrink-0">
        <Icon
          icon="heart-pulse"
          iconLibrary="lucide"
          className="group-hover:text-white"
          overrideColor
          size={14}
        />
      </span>
      <span className="flex-1 text-left">Check Health</span>
      {status === 'loading' && (
        <span
          className="ml-2 w-3 h-3 rounded-full border-2 animate-spin shrink-0"
          style={{
            borderColor: 'var(--app-text-soft)',
            borderTopColor: 'transparent',
          }}
        />
      )}
      {status === 'success' && (
        <span
          className="ml-2 text-xs font-semibold tabular-nums shrink-0"
          style={{ color: statusColor }}
        >
          {statusCode}
        </span>
      )}
      {status === 'error' && (
        <span
          className="ml-2 text-xs font-semibold tabular-nums shrink-0"
          style={{ color: statusColor }}
        >
          {statusCode || 'ERR'}
        </span>
      )}
    </button>
  );
}
