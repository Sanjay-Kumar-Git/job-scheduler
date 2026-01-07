/**
 * glass
 *
 * Purpose:
 * - Centralized glassmorphism style tokens
 * - Used across the app for consistent frosted-glass UI
 *
 * Why this exists:
 * - Avoids repeating RGBA + blur values everywhere
 * - Makes light/dark theme switching predictable
 * - Easy to tweak glass effect globally from one place
 */

export const glass = {
  /**
   * Light theme glass styles
   * - Brighter frosted look
   * - Subtle dark border for contrast
   */
  light: {
    background: "rgba(255, 255, 255, 0.75)", // translucent white
    border: "rgba(0, 0, 0, 0.1)",             // soft dark border
    blur: "blur(16px)",                       // glass blur strength
  },

  /**
   * Dark theme glass styles
   * - Dark frosted look
   * - Light border for separation on dark backgrounds
   */
  dark: {
    background: "rgba(15, 23, 42, 0.75)",     // translucent dark slate
    border: "rgba(255, 255, 255, 0.12)",     // subtle light border
    blur: "blur(16px)",                       // same blur for consistency
  },
};
