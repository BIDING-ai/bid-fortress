export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast">
      <div className="toast-icon">✓</div>

      <div className="toast-content">
        <strong>TRANSACTION UPDATE</strong>
        <span>{message}</span>
      </div>

      <button onClick={onClose}>×</button>
    </div>
  );
}