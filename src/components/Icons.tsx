import * as P from '@phosphor-icons/react/dist/ssr';
import type { Icon as PhosphorIcon, IconWeight } from '@phosphor-icons/react';

type Props = { size?: number; className?: string; weight?: IconWeight; 'aria-hidden'?: boolean | 'true' | 'false' };

/**
 * One place for icons. Content icons are duotone (a quiet tinted fill behind
 * the stroke); directional arrows stay a plain stroke so they read as motion.
 */
function make(C: PhosphorIcon, weight: IconWeight) {
  function Icon({ size = 16, className, weight: w }: Props) {
    return <C size={size} weight={w ?? weight} className={className} aria-hidden />;
  }
  return Icon;
}

export const IconArrowLeft = make(P.ArrowLeft, 'regular');
export const IconArrowRight = make(P.ArrowRight, 'regular');
export const IconArrowUpRight = make(P.ArrowUpRight, 'regular');
export const IconCaretLeft = make(P.CaretLeft, 'bold');
export const IconCaretRight = make(P.CaretRight, 'bold');
export const IconClose = make(P.X, 'bold');
export const IconMonitor = make(P.Monitor, 'duotone');
export const IconSun = make(P.Sun, 'duotone');
export const IconMoon = make(P.Moon, 'duotone');
export const IconCompare = make(P.ArrowsHorizontal, 'bold');
export const IconResume = make(P.FileText, 'duotone');
export const IconMail = make(P.EnvelopeSimple, 'duotone');
export const IconImage = make(P.Image, 'duotone');
export const IconPlay = make(P.PlayCircle, 'duotone');
export const IconGithub = make(P.GithubLogo, 'duotone');
export const IconLinkedin = make(P.LinkedinLogo, 'duotone');
export const IconX = make(P.XLogo, 'duotone');
export const IconArrowUp = make(P.ArrowUp, 'bold');
export const IconCheck = make(P.Check, 'bold');
export const IconSparkle = make(P.Sparkle, 'duotone');
export const IconReplay = make(P.ArrowCounterClockwise, 'bold');
export const IconCaretDown = make(P.CaretDown, 'bold');
export const IconSpeaker = make(P.SpeakerHigh, 'regular');
export const IconSpeakerOff = make(P.SpeakerSlash, 'regular');
