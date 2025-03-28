
import { useCallback, useEffect, useRef, useState } from 'react';
import { Bold, Italic, List, Quote, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextEditor = ({ value, onChange, className }: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value;
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Update content when typing
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // Handle formatting commands
  const execCommand = useCallback((command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [handleInput]);

  // Handle image upload
  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            execCommand('insertImage', event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [execCommand]);

  // Handle link insertion
  const handleLinkInsert = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  }, [execCommand]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Toolbar */}
      <div className="glass-card rounded-lg p-2 flex flex-wrap gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            execCommand('bold');
          }}
          className="p-1 h-8 w-8"
          title="Bold"
          type="button" // Explicitly set type to button
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('italic');
          }}
          className="p-1 h-8 w-8"
          title="Italic"
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('formatBlock', '<h1>');
          }}
          className="p-1 h-8 w-8"
          title="Heading 1"
          type="button"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('formatBlock', '<h2>');
          }}
          className="p-1 h-8 w-8"
          title="Heading 2"
          type="button"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('insertOrderedList');
          }}
          className="p-1 h-8 w-8"
          title="Ordered List"
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('formatBlock', '<blockquote>');
          }}
          className="p-1 h-8 w-8"
          title="Quote"
          type="button"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            handleLinkInsert();
          }}
          className="p-1 h-8 w-8"
          title="Insert Link"
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            handleImageUpload();
          }}
          className="p-1 h-8 w-8"
          title="Insert Image"
          type="button"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('formatBlock', '<pre>');
          }}
          className="p-1 h-8 w-8"
          title="Code Block"
          type="button"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('justifyLeft');
          }}
          className="p-1 h-8 w-8"
          title="Align Left"
          type="button"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('justifyCenter');
          }}
          className="p-1 h-8 w-8"
          title="Align Center"
          type="button"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            execCommand('justifyRight');
          }}
          className="p-1 h-8 w-8"
          title="Align Right"
          type="button"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Editor area */}
      <div 
        ref={editorRef}
        className="glass-card min-h-[300px] p-4 rounded-lg focus:outline-none"
        contentEditable={true}
        onInput={handleInput}
        onBlur={handleInput}
      />
    </div>
  );
};

export default TextEditor;
