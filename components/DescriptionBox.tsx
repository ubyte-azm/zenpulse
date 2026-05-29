'use client';

import { useState } from 'react';

function parseDescription(text: string) {
  const specs: { key: string; value: string }[] = [];
  let body = text;

  if (text.startsWith('SPECIFICATIONS')) {
    body = text.slice('SPECIFICATIONS'.length);

    // Extract key: value pairs until we hit long-form marketing sentences
    const specPattern = /([A-Za-z][A-Za-z\s./0-9-]*?):\s*(.*?)(?=(?:[A-Za-z][A-Za-z\s./0-9-]*?):|\s{2,}|$)/gs;
    let match;
    let lastValidEnd = 0;

    while ((match = specPattern.exec(body)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!key || !value) continue;
      // Stop when value looks like a marketing sentence (long + full stop)
      if (value.split(' ').length > 12 && /[.!]/.test(value)) break;
      specs.push({ key, value });
      lastValidEnd = specPattern.lastIndex;
    }

    body = body.slice(lastValidEnd).trim();
  }

  // Split body into paragraphs at sentence boundaries before a capital letter
  const paragraphs = body
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map(p => p.trim())
    .filter(p => p.length > 30);

  return { specs, paragraphs };
}

export default function DescriptionBox({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const { specs, paragraphs } = parseDescription(text);
  const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 2);

  return (
    <div className="pt-4 border-t border-gray-100 space-y-5">
      <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Product Details</p>

      {/* Specs grid */}
      {specs.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {specs.map(({ key, value }) => (
            <div key={key} className="col-span-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{key}</p>
              <p className="text-sm text-gray-700 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Marketing paragraphs */}
      {paragraphs.length > 0 && (
        <div className="space-y-3">
          {visibleParagraphs.map((p, i) => (
            <p key={i} className="text-sm text-gray-500 leading-relaxed">{p}</p>
          ))}

          {paragraphs.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-black underline underline-offset-2 mt-1"
            >
              {expanded ? 'Show less ↑' : `Read more (${paragraphs.length - 2} more) ↓`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
