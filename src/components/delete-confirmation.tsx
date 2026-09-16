type DeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="rounded-small border border-focus-accent bg-danger-soft p-3 text-sm">
      <p className="font-semibold">Delete this event?</p>
      <p className="mt-1 text-event-muted">This cannot be undone.</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="min-h-11 rounded-small bg-danger px-3 font-semibold text-white transition duration-200 hover:bg-danger-hover active:translate-y-px"
        >
          Delete event
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-small px-3 font-semibold hover:bg-event-surface active:translate-y-px"
        >
          Keep it
        </button>
      </div>
    </div>
  );
}
