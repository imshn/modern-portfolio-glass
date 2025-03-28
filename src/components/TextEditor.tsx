
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TextEditor = ({ value, onChange, className }: TextEditorProps) => {
  const editorRef = useRef<any>(null);

  return (
    <div className={className}>
      <Editor
        apiKey="your-api-key" // You can get a free API key from TinyMCE
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
};

export default TextEditor;
