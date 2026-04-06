import { useState, useCallback } from 'react';

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
      className="app-sidebar-link group flex items-center py-1 cursor-pointer text-left w-full"
      style={{ border: 'none', background: 'none', padding: '0.25rem 0' }}
      aria-label="Check backend health status"
    >
      <span className="flex-1 text-sm">Check Health</span>
      {status === 'loading' && (
        <span
          className="ml-2 w-3 h-3 rounded-full border-2 animate-spin shrink-0"
          style={{
            borderColor: 'var(--app-text-soft)',
            borderTopColor: 'transparent',
          }}
          aria-label="Loading"
          role="status"
        />
      )}
      {status === 'success' && (
        <span
          className="ml-2 text-xs font-semibold tabular-nums shrink-0"
          style={{ color: statusColor }}
          aria-label={`Status code ${statusCode}`}
        >
          {statusCode}
        </span>
      )}
      {status === 'error' && (
        <span
          className="ml-2 text-xs font-semibold tabular-nums shrink-0"
          style={{ color: statusColor }}
          aria-label={`Error: status code ${statusCode || 'unreachable'}`}
        >
          {statusCode || 'ERR'}
        </span>
      )}
    </button>
  );
}
