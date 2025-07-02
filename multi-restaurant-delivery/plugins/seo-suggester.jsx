import { useState } from "react";

export default function SeoSuggester({ pageId, title, description }) {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchSuggestion() {
    setLoading(true);
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId, currentTitle: title, currentDescription: description })
    });
    const { suggestion } = await res.json();
    setSuggestion(suggestion);
    setLoading(false);
  }

  return (
    <div className="p-4 border rounded">
      <button onClick={fetchSuggestion} disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Generiere…" : "SEO-Vorschlag anzeigen"}
      </button>
      {suggestion && (
        <pre className="mt-4 p-2 bg-gray-100 rounded text-sm">{suggestion}</pre>
      )}
    </div>
  );
}
