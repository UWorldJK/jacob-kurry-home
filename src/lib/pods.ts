export type Phase = 'Pending' | 'ContainerCreating' | 'Running' | 'Completed';

export type PodState = {
  phase: Phase;
  /** ms epoch when the pod was scheduled; drives AGE. */
  createdAt: number;
};

/** Delay (ms) spent in each phase before moving on. */
export const PHASE_DELAYS: Record<Phase, number> = {
  Pending: 450,
  ContainerCreating: 700,
  Running: 0,
  Completed: 0,
};

/** Next phase in the lifecycle, or null if terminal. Jobs finish as Completed. */
export function nextPhase(phase: Phase, kind: 'pod' | 'job' | 'cronjob'): Phase | null {
  switch (phase) {
    case 'Pending':
      return 'ContainerCreating';
    case 'ContainerCreating':
      return kind === 'pod' ? 'Running' : 'Completed';
    default:
      return null;
  }
}

export function ready(phase: Phase): string {
  return phase === 'Running' ? '1/1' : '0/1';
}

/** kubectl-style AGE: 42s, 3m12s, 14m, 2h5m, 3d. */
export function formatAge(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 120) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 10) return `${m}m${s % 60}s`;
  if (m < 180) return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h${m % 60}m`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
