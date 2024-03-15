interface IFormButton {
  loading: boolean;
  text: string;
}

export default function FormButton({ loading, text }: IFormButton) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:bg-neutral-400 text-neutral-300 cursor-not-allowed"
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
