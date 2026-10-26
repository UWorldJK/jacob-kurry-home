import { forwardRef, useRef, useState, type KeyboardEvent } from 'react';
import { complete, run } from '../lib/shell';
import { scrollToId } from '../lib/scroll';

type Entry = { input: string; lines: string[] };

const INTRO: Entry = { input: '', lines: ['interactive shell. type `help`, or try `kubectl get pods`.'] };

export const Shell = forwardRef<HTMLInputElement>(function Shell(_, inputRef) {
  const [log, setLog] = useState<Entry[]>([INTRO]);
  const [value, setValue] = useState('');
  const history = useRef<string[]>([]);
  const cursor = useRef(0);

  const submit = () => {
    const res = run(value);
    if (value.trim()) history.current.push(value);
    cursor.current = history.current.length;
    if (res.action?.type === 'clear') setLog([]);
    else setLog((l) => [...l, { input: value, lines: res.lines }]);
    if (res.action?.type === 'scroll') scrollToId(res.action.id);
    if (res.action?.type === 'open') window.open(res.action.url, res.action.url.startsWith('mailto:') ? '_self' : '_blank', 'noopener');
    setValue('');
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'Tab') {
      e.preventDefault();
      setValue((v) => complete(v));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const h = history.current;
      cursor.current = Math.max(0, Math.min(h.length, cursor.current + (e.key === 'ArrowUp' ? -1 : 1)));
      setValue(h[cursor.current] ?? '');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLog([]);
    }
  };

  return (
    <div className="shell" onClick={() => (inputRef as React.RefObject<HTMLInputElement>)?.current?.focus()}>
      <div className="shell-log" aria-live="polite">
        {log.map((entry, i) => (
          <div key={i}>
            {entry.input && (
              <p className="cmd">
                <span className="prompt">$</span> {entry.input}
              </p>
            )}
            {entry.lines.map((line, j) => (
              <pre key={j} className={`out ${/not found|Error|No such/.test(line) ? 'err' : ''}`}>
                {line}
              </pre>
            ))}
          </div>
        ))}
      </div>
      <label className="shell-input">
        <span className="ps1">jacob@boulder-co</span> <span className="dim">~</span> <span className="prompt">$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Shell command"
          placeholder="help"
        />
      </label>
    </div>
  );
});
