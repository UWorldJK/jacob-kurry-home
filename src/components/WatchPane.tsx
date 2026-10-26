import { useState } from 'react';
import { workloads } from '../content';
import { useCluster, useNow } from '../lib/cluster';
import { formatAge, ready } from '../lib/pods';
import { scrollToId } from '../lib/scroll';

export function WatchPane() {
  const { pods, order, events, active } = useCluster();
  const now = useNow();
  const [open, setOpen] = useState(false);
  const running = order.filter((id) => pods[id]?.phase === 'Running' || pods[id]?.phase === 'Completed').length;

  return (
    <aside className={`watch ${open ? 'is-open' : ''}`} aria-label="Cluster status">
      <button className="watch-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="prompt">$</span> kubectl get pods -w{' '}
        <span className="dim">
          {running}/{workloads.length} up
        </span>
      </button>
      <div className="watch-body">
        <p className="cmd watch-cmd">
          <span className="prompt">$</span> kubectl get pods -n jacob-kurry -w
        </p>
        <table className="pods">
          <thead>
            <tr>
              <th>NAME</th>
              <th>READY</th>
              <th>STATUS</th>
              <th className="col-restarts">RESTARTS</th>
              <th>AGE</th>
            </tr>
          </thead>
          <tbody>
            {order.length === 0 && (
              <tr>
                <td colSpan={5} className="dim">
                  No resources found in jacob-kurry namespace.
                </td>
              </tr>
            )}
            {order.map((id) => {
              const w = workloads.find((x) => x.id === id)!;
              const p = pods[id];
              return (
                <tr key={id} className={active === id ? 'is-active' : ''}>
                  <td>
                    <button className="pod-link" onClick={() => scrollToId(id)}>
                      <span className="name-full">{w.podName}</span>
                      <span className="name-short">{w.id}</span>
                    </button>
                  </td>
                  <td>{ready(p.phase)}</td>
                  <td>
                    <span className={`phase ${p.phase}`}>{p.phase}</span>
                  </td>
                  <td className="col-restarts">0</td>
                  <td>{formatAge(now - p.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="cmd watch-cmd">
          <span className="prompt">$</span> kubectl get events -w
        </p>
        <ul className="kevents" aria-live="polite">
          {events.length === 0 && <li className="dim">waiting for workloads…</li>}
          {events.map((e, i) => (
            <li key={`${e.at}-${i}`}>
              <span className="dim">{formatAge(now - e.at)}</span> <span className="ev-reason">{e.reason}</span>{' '}
              <span className="dim">{e.object}</span> {e.message}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
