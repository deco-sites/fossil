export interface TextSegment {
  text: string;
  bold?: boolean;
}

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const toStrongSegments = (value?: string): TextSegment[] => {
  if (!value) {
    return [];
  }

  const segments: TextSegment[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;

  for (const match of value.matchAll(pattern)) {
    if (match.index === undefined) {
      continue;
    }

    if (match.index > lastIndex) {
      const plain = value.slice(lastIndex, match.index);
      if (plain) {
        segments.push({ text: plain });
      }
    }

    const boldText = match[1];
    if (boldText) {
      segments.push({ text: boldText, bold: true });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    const tail = value.slice(lastIndex);
    if (tail) {
      segments.push({ text: tail });
    }
  }

  return segments.length ? segments : [{ text: value }];
};

export const toStrongHTML = toStrongSegments;
