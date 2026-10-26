import { profile, workloads } from '../content';

export type ShellAction =
  | { type: 'scroll'; id: string }
  | { type: 'open'; url: string }
  | { type: 'clear' };

export type ShellResult = { lines: string[]; action?: ShellAction };

export const COMMANDS = [
  'help',
  'whoami',
  'kubectl get pods',
  'kubectl describe pod',
  'kubectl logs',
  'open cv',
  'mail',
  'github',
  'clear',
];

const HELP = [
  'available commands:',
  '  whoami                      who runs this cluster',
  '  kubectl get pods            list workloads',
  '  kubectl describe pod <name> jump to a workload',
  '  open cv                     download the CV (pdf)',
  '  mail                        email me',
  '  github                      open my GitHub',
  '  clear                       clear the screen',
];

function findWorkload(query: string) {
  const q = query.toLowerCase();
  return workloads.find((w) => w.podName.startsWith(q) || w.id.startsWith(q));
}

export function run(input: string): ShellResult {
  const line = input.trim().replace(/\s+/g, ' ');
  if (!line) return { lines: [] };
  const [cmd, ...rest] = line.split(' ');
  const args = rest.join(' ');

  switch (cmd) {
    case 'help':
    case '?':
      return { lines: HELP };
    case 'whoami':
      return { lines: [`${profile.displayName}, ${profile.location}`, profile.tagline] };
    case 'clear':
      return { lines: [], action: { type: 'clear' } };
    case 'mail':
      return { lines: [`opening mail to ${profile.email}`], action: { type: 'open', url: `mailto:${profile.email}` } };
    case 'github':
      return { lines: [`opening ${profile.github}`], action: { type: 'open', url: profile.github } };
    case 'open':
    case 'cat':
      if (/^cv(\.pdf)?$/.test(args)) {
        return { lines: ['opening cv.pdf'], action: { type: 'open', url: profile.cv } };
      }
      return { lines: [`${cmd}: ${args || '<missing file>'}: No such file or directory`] };
    case 'sudo':
      return { lines: ['jacob is not in the sudoers file. This incident will be reported.'] };
    case 'exit':
      return { lines: ['there is no escape. try `open cv` instead.'] };
    case 'k':
    case 'kubectl':
      return kubectl(rest);
    default:
      return { lines: [`zsh: command not found: ${cmd}`] };
  }
}

function kubectl(args: string[]): ShellResult {
  const [verb, ...rest] = args;
  if (verb === 'get' && /^(po|pods?)$/.test(rest[0] ?? '')) {
    const width = Math.max(...workloads.map((w) => w.podName.length)) + 3;
    return {
      lines: [
        'NAME'.padEnd(width) + 'READY   STATUS',
        ...workloads.map(
          (w) => w.podName.padEnd(width) + (w.kind === 'pod' ? '1/1     Running' : '0/1     Completed'),
        ),
      ],
    };
  }
  if (verb === 'describe' || verb === 'logs') {
    const name = rest.filter((a) => !/^(po|pods?)$/.test(a))[0];
    if (!name) return { lines: [`error: you must specify the name of a pod to ${verb}`] };
    const w = findWorkload(name);
    if (!w) return { lines: [`Error from server (NotFound): pods "${name}" not found`] };
    if (verb === 'logs') return { lines: w.events.map((e) => `[${w.id}] ${e}`) };
    return { lines: [`jumping to ${w.podName}`], action: { type: 'scroll', id: w.id } };
  }
  return { lines: ['usage: kubectl get pods | kubectl describe pod <name> | kubectl logs <name>'] };
}

/** Tab completion over known commands and pod names. */
export function complete(input: string): string {
  const candidates = [
    ...COMMANDS,
    ...workloads.flatMap((w) => [`kubectl describe pod ${w.podName}`, `kubectl logs ${w.podName}`]),
  ];
  const matches = candidates.filter((c) => c.startsWith(input));
  if (matches.length === 0) return input;
  let prefix = matches[0];
  for (const m of matches) {
    while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix.length > input.length ? prefix : input;
}
