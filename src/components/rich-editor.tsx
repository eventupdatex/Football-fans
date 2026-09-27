import React, { useRef, useEffect } from 'react';
import {
  Bold, Italic, Underline, Highlighter, Heading1, Heading2, Heading3,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link2, Quote, Undo2, Redo2,
} from 'lucide-react';

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function exec(cmd: string, val?: string) {
  document.execCommand(cmd, false, val);
}

function RichEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  const tools: { icon: React.ReactNode; title: string; run: () => void }[] = [
    { icon: <Undo2 className="h-3.5 w-3.5" />, title: 'Undo', run: () => exec('undo') },
    { icon: <Redo2 className="h-3.5 w-3.5" />, title: 'Redo', run: () => exec('redo') },
    { icon: <Heading1 className="h-3.5 w-3.5" />, title: 'Heading 1', run: () => exec('formatBlock', 'h1') },
    { icon: <Heading2 className="h-3.5 w-3.5" />, title: 'Heading 2', run: () => exec('formatBlock', 'h2') },
    { icon: <Heading3 className="h-3.5 w-3.5" />, title: 'Heading 3', run: () => exec('formatBlock', 'h3') },
    { icon: <Bold className="h-3.5 w-3.5" />, title: 'Bold', run: () => exec('bold') },
    { icon: <Italic className="h-3.5 w-3.5" />, title: 'Italic', run: () => exec('italic') },
    { icon: <Underline className="h-3.5 w-3.5" />, title: 'Underline', run: () => exec('underline') },
    { icon: <Highlighter className="h-3.5 w-3.5" />, title: 'Highlight', run: () => exec('hiliteColor', '#fef08a') },
    { icon: <Quote className="h-3.5 w-3.5" />, title: 'Quote', run: () => exec('formatBlock', 'blockquote') },
    { icon: <List className="h-3.5 w-3.5" />, title: 'Bullet list', run: () => exec('insertUnorderedList') },
    { icon: <ListOrdered className="h-3.5 w-3.5" />, title: 'Numbered list', run: () => exec('insertOrderedList') },
    { icon: <AlignLeft className="h-3.5 w-3.5" />, title: 'Align left', run: () => exec('justifyLeft') },
    { icon: <AlignCenter className="h-3.5 w-3.5" />, title: 'Align center', run: () => exec('justifyCenter') },
    { icon: <AlignRight className="h-3.5 w-3.5" />, title: 'Align right', run: () => exec('justifyRight') },
    {
      icon: <Link2 className="h-3.5 w-3.5" />,
      title: 'Link',
      run: () => {
        const url = window.prompt('Link URL');
        if (url) exec('createLink', url);
      },
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <div className="flex flex-wrap gap-0.5 border-b border-slate-100 bg-slate-50 p-1.5">
        {tools.map((t) => (
          <button
            key={t.title}
            type="button"
            title={t.title}
            onMouseDown={(e) => {
              e.preventDefault();
              t.run();
              if (ref.current) onChange(ref.current.innerHTML);
            }}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
          >
            {t.icon}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder || 'Write the full story…'}
        className="min-h-[160px] max-h-[320px] overflow-y-auto px-3 py-2.5 text-sm text-slate-800 leading-relaxed outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400"
        onInput={() => {
          if (ref.current) onChange(ref.current.innerHTML);
        }}
      />
      <p className="px-3 py-1.5 text-[10px] text-slate-400 border-t border-slate-100 bg-slate-50">
        Headings · Bold · Italic · Underline · Highlight · Lists · Align · Links (Word-style tools)
      </p>
    </div>
  );
}

export { RichEditor };
