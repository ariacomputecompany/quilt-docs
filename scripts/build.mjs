import { spawn } from 'node:child_process';

const child = spawn('npx', ['astro', 'build'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
});

let skipCssWarningBlock = false;
let stdoutBuffer = '';
let stderrBuffer = '';

const FONT_WARNING_FRAGMENT = '"fontData" is not exported by "\\0virtual:astro:assets/fonts/internal"';
const CSS_WARNING_START = 'Found 67 warnings while optimizing generated CSS:';
const CSS_WARNING_END_PREFIXES = [
  '✓ built in',
  'transforming...',
  'rendering chunks...',
  'computing gzip size...',
  'generating static routes',
  '[build] ✓ Completed',
  '[vite] ✓ built',
];

function shouldResumeFromCssWarning(line) {
  return CSS_WARNING_END_PREFIXES.some((prefix) => line.includes(prefix));
}

function filterLine(line) {
  if (skipCssWarningBlock) {
    if (shouldResumeFromCssWarning(line)) {
      skipCssWarningBlock = false;
      return line;
    }
    return null;
  }

  if (line.includes(CSS_WARNING_START)) {
    skipCssWarningBlock = true;
    return null;
  }

  if (line.includes(FONT_WARNING_FRAGMENT)) {
    return null;
  }

  return line;
}

function flushBuffer(buffer, writer) {
  const lines = buffer.split('\n');
  const remainder = lines.pop() ?? '';

  for (const line of lines) {
    const filtered = filterLine(line);
    if (filtered !== null) {
      writer.write(`${filtered}\n`);
    }
  }

  return remainder;
}

child.stdout.on('data', (chunk) => {
  stdoutBuffer += chunk.toString();
  stdoutBuffer = flushBuffer(stdoutBuffer, process.stdout);
});

child.stderr.on('data', (chunk) => {
  stderrBuffer += chunk.toString();
  stderrBuffer = flushBuffer(stderrBuffer, process.stderr);
});

child.on('close', (code, signal) => {
  if (stdoutBuffer.length > 0) {
    const filtered = filterLine(stdoutBuffer);
    if (filtered !== null) {
      process.stdout.write(filtered);
    }
  }

  if (stderrBuffer.length > 0) {
    const filtered = filterLine(stderrBuffer);
    if (filtered !== null) {
      process.stderr.write(filtered);
    }
  }

  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
