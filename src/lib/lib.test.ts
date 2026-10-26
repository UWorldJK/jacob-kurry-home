import { describe, expect, it } from 'vitest';
import { formatAge, nextPhase, ready } from './pods';
import { complete, run } from './shell';

describe('pod lifecycle', () => {
  it('pods end Running, jobs end Completed', () => {
    expect(nextPhase('Pending', 'pod')).toBe('ContainerCreating');
    expect(nextPhase('ContainerCreating', 'pod')).toBe('Running');
    expect(nextPhase('ContainerCreating', 'job')).toBe('Completed');
    expect(nextPhase('Running', 'pod')).toBeNull();
    expect(ready('Running')).toBe('1/1');
    expect(ready('Pending')).toBe('0/1');
  });

  it('formats AGE like kubectl', () => {
    expect(formatAge(42_000)).toBe('42s');
    expect(formatAge(192_000)).toBe('3m12s');
    expect(formatAge(14 * 60_000)).toBe('14m');
    expect(formatAge(125 * 60_000)).toBe('2h5m');
    expect(formatAge(72 * 3_600_000)).toBe('3d');
  });
});

describe('shell', () => {
  it('reports unknown commands like zsh', () => {
    expect(run('vim').lines).toEqual(['zsh: command not found: vim']);
  });

  it('opens the CV', () => {
    expect(run('open cv').action).toEqual({ type: 'open', url: '/cv.pdf' });
    expect(run('cat cv.pdf').action).toEqual({ type: 'open', url: '/cv.pdf' });
  });

  it('describe jumps to a workload by prefix', () => {
    expect(run('kubectl describe pod lunar').action).toEqual({ type: 'scroll', id: 'lunar-outpost' });
    expect(run('k describe po ula').action).toEqual({ type: 'scroll', id: 'ula' });
    expect(run('kubectl describe pod nope').lines[0]).toMatch(/NotFound/);
  });

  it('lists pods with a header row', () => {
    const { lines } = run('kubectl get pods');
    expect(lines[0]).toMatch(/^NAME\s+READY\s+STATUS$/);
    expect(lines).toHaveLength(8);
  });

  it('tab-completes to the longest common prefix', () => {
    expect(complete('wh')).toBe('whoami');
    expect(complete('kubectl d')).toBe('kubectl describe pod');
    expect(complete('zzz')).toBe('zzz');
  });
});
