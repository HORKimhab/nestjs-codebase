import { spawn } from 'child_process';

export async function runPythonScript(
  scriptPath: string,
): Promise<{ success: boolean; output: string; error?: string }> {
  return new Promise((resolve) => {
    const process = spawn('python', [scriptPath]);
    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true, output: stdout });
      } else {
        resolve({ success: false, output: stdout, error: stderr });
      }
    });
  });
}

export function detectDeviceType(userAgent: string) {
  const ua = userAgent.toLowerCase();

  // Check for mobile indicators
  const isMobile =
    /mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini|windows phone/.test(
      ua,
    );

  // Check for tablet indicators
  const isTablet =
    /ipad|tablet|android(?!.*mobile)|nexus 7|nexus 10|xoom|sch-i800|playbook|silk/.test(
      ua,
    );

  if (isTablet) {
    return 'tablet';
  } else if (isMobile) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}
