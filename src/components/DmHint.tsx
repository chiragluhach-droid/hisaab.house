/** Small note under buy buttons: Instagram can't pre-fill DMs, so we copy the message. */
export function DmHint({ className = "" }: { className?: string }) {
  return <p className={`label !text-[0.6875rem] ${className}`}>Opens Instagram DM · message copied, just paste &amp; send</p>;
}
