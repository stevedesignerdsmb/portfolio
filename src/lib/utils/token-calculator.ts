/**
 * Estimates token usage based on codebase size
 * Uses a multiplier to account for development iterations, prompts, and refinements
 */
export function estimateTokenUsage(): number {
  // Base calculation: approximate tokens from codebase
  // Rough estimate: 1 token ≈ 4 characters
  // We'll use a static calculation based on the current codebase size
  
  // Current codebase: ~150K characters in source files
  // Base tokens: ~37K tokens (150K / 4)
  // Apply multiplier of ~12x to account for:
  // - Multiple iterations and refinements
  // - Prompts and responses
  // - Testing and debugging
  // - Documentation and planning
  
  const baseTokens = 37500; // ~150K characters / 4
  const multiplier = 12; // Accounts for development process overhead
  const estimatedTokens = baseTokens * multiplier;
  
  return estimatedTokens;
}

/**
 * Formats token count for display
 * Returns the number in millions (e.g., 10M) or thousands (e.g., 500K)
 */
export function formatTokenCount(tokens: number): number {
  // Convert to millions for display
  // If less than 1M, show in thousands (K)
  if (tokens >= 1000000) {
    return Math.round(tokens / 100000) / 10; // Round to 1 decimal place in millions
  } else {
    return Math.round(tokens / 1000); // Round to nearest thousand
  }
}

/**
 * Gets the formatted token count with unit
 */
export function getFormattedTokenDisplay(tokens: number): { value: number; unit: string } {
  if (tokens >= 1000000) {
    const millions = Math.round(tokens / 100000) / 10;
    return { value: millions, unit: 'M' };
  } else {
    const thousands = Math.round(tokens / 1000);
    return { value: thousands, unit: 'K' };
  }
}
