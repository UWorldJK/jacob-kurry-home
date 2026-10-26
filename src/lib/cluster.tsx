import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { workloads } from '../content';
import { PHASE_DELAYS, nextPhase, type Phase, type PodState } from './pods';

type ClusterEvent = { at: number; reason: string; object: string; message: string };

type Cluster = {
  pods: Record<string, PodState>;
  order: string[];
  events: ClusterEvent[];
  active: string;
  schedule: (id: string) => void;
  setActive: (id: string) => void;
};

const ClusterContext = createContext<Cluster | null>(null);

const kindOf = (id: string) => workloads.find((w) => w.id === id)?.kind ?? 'pod';
const nameOf = (id: string) => workloads.find((w) => w.id === id)?.podName ?? id;

const REASON: Record<Phase, string> = {
  Pending: 'Scheduled',
  ContainerCreating: 'Pulling',
  Running: 'Started',
  Completed: 'Completed',
};

export function ClusterProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [pods, setPods] = useState<Record<string, PodState>>({});
  const [order, setOrder] = useState<string[]>([]);
  const [events, setEvents] = useState<ClusterEvent[]>([]);
  const [active, setActive] = useState('boot');
  const scheduled = useRef(new Set<string>());
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const emit = useCallback((id: string, phase: Phase) => {
    const message =
      phase === 'Pending'
        ? `Successfully assigned jacob-kurry/${nameOf(id)} to boulder-co`
        : phase === 'ContainerCreating'
          ? 'Pulling image'
          : phase === 'Running'
            ? 'Started container'
            : 'Job completed';
    setEvents((e) => [...e.slice(-5), { at: Date.now(), reason: REASON[phase], object: `pod/${nameOf(id)}`, message }]);
  }, []);

  const scheduleOne = useCallback(
    (id: string) => {
      if (scheduled.current.has(id)) return;
      scheduled.current.add(id);
      const kind = kindOf(id);
      const createdAt = Date.now();
      setOrder((o) => [...o, id]);

      if (reduced) {
        const final: Phase = kind === 'pod' ? 'Running' : 'Completed';
        setPods((p) => ({ ...p, [id]: { phase: final, createdAt } }));
        emit(id, final);
        return;
      }

      const advance = (phase: Phase) => {
        setPods((p) => ({ ...p, [id]: { phase, createdAt } }));
        emit(id, phase);
        const next = nextPhase(phase, kind);
        if (next) timers.current.push(window.setTimeout(() => advance(next), PHASE_DELAYS[phase]));
      };
      advance('Pending');
    },
    [reduced, emit],
  );

  // Jumping ahead (status bar, shell, `/`) still brings up every workload above the target, in order.
  const schedule = useCallback(
    (id: string) => {
      const idx = workloads.findIndex((w) => w.id === id);
      workloads.slice(0, idx + 1).forEach((w) => scheduleOne(w.id));
    },
    [scheduleOne],
  );

  const value = useMemo(
    () => ({ pods, order, events, active, schedule, setActive }),
    [pods, order, events, active, schedule],
  );
  return <ClusterContext.Provider value={value}>{children}</ClusterContext.Provider>;
}

export function useCluster() {
  const ctx = useContext(ClusterContext);
  if (!ctx) throw new Error('useCluster must be used inside ClusterProvider');
  return ctx;
}

/**
 * Schedules a pod the first time its section scrolls into view, and tracks the active section.
 * `scheduleId` names the workload to bring up (null for sections that are not workloads).
 */
export function useWorkloadSection(id: string, ref: RefObject<HTMLElement>, scheduleId: string | null = id) {
  const { schedule, setActive, pods } = useCluster();
  const seen = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });
  const centered = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (seen && scheduleId) schedule(scheduleId);
  }, [seen, scheduleId, schedule]);

  useEffect(() => {
    if (centered) setActive(id);
  }, [centered, id, setActive]);

  return pods[id];
}

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}
