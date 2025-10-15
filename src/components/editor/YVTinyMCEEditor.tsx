'use client';

import React, { useRef, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { cn } from '@/lib/utils';

interface YVTinyMCEEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function YVTinyMCEEditor({
  content,
  onChange,
  placeholder = 'Digite o conteúdo aqui...',
  disabled = false,
  className = ''
}: YVTinyMCEEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const handleEditorChange = useCallback((content: string) => {
    console.log('Editor content changed:', content);
    onChange(content);
  }, [onChange]);

  return (
    <div className={cn('relative', className)}>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE}
        onInit={(evt, editor) => editorRef.current = editor}
        value={content}
        onEditorChange={handleEditorChange}
        disabled={disabled}
        init={{
          height: 500,
          menubar: true,
          branding: false,
          promotion: false,
          entity_encoding: 'raw',
          encoding: 'utf8',
          convert_urls: false,
          relative_urls: false,
          remove_script_host: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
            'codesample', 'pagebreak', 'nonbreaking', 'quickbars', 'accordion',
            'autosave', 'save', 'directionality', 'visualchars'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | image | link | table | code | fullscreen | ' +
            'searchreplace | visualblocks | charmap | emoticons | ' +
            'insertdatetime | media | preview | anchor | pagebreak | ' +
            'nonbreaking | codesample | quickbars | accordion | ' +
            'autosave | save | directionality | visualchars | yvcta',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
              font-size: 14px; 
              line-height: 1.6; 
              color: #1f2937;
              margin: 0;
              padding: 16px;
            }
            h1, h2, h3, h4, h5, h6 { 
              color: #111827; 
              margin-top: 1.5em; 
              margin-bottom: 0.5em; 
              font-weight: 600;
            }
            h1 { font-size: 2.25em; line-height: 1.2; }
            h2 { font-size: 1.875em; line-height: 1.3; }
            h3 { font-size: 1.5em; line-height: 1.4; }
            h4 { font-size: 1.25em; line-height: 1.4; }
            h5 { font-size: 1.125em; line-height: 1.4; }
            h6 { font-size: 1em; line-height: 1.4; }
            p { 
              margin-bottom: 1em; 
              line-height: 1.7;
            }
            ul, ol { 
              margin-bottom: 1em; 
              padding-left: 1.5em; 
            }
            li {
              margin-bottom: 0.25em;
            }
            blockquote { 
              border-left: 4px solid #3b82f6; 
              padding: 1rem 1.5rem; 
              margin: 1.5em 0; 
              background-color: #f8fafc;
              border-radius: 0 0.5rem 0.5rem 0;
              font-style: italic; 
              color: #4b5563; 
            }
            code { 
              background-color: #f1f5f9; 
              padding: 0.125rem 0.375rem; 
              border-radius: 0.25rem; 
              font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace; 
              font-size: 0.875em; 
              color: #e11d48;
              border: 1px solid #e2e8f0;
            }
            pre { 
              background-color: #1e293b; 
              color: #e2e8f0;
              padding: 1.5rem; 
              border-radius: 0.5rem; 
              overflow-x: auto; 
              margin: 1.5em 0; 
              font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace;
              font-size: 0.875em;
              line-height: 1.5;
            }
            pre code {
              background: none;
              border: none;
              color: inherit;
              padding: 0;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 1.5em 0; 
              border-radius: 0.5rem;
              overflow: hidden;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            }
            th, td { 
              border: 1px solid #e5e7eb; 
              padding: 0.75rem 1rem; 
              text-align: left; 
            }
            th { 
              background-color: #f9fafb; 
              font-weight: 600; 
              color: #374151;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            img { 
              max-width: 100%; 
              height: auto; 
              border-radius: 0.5rem; 
              margin: 1em 0; 
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            a { 
              color: #2563eb; 
              text-decoration: underline; 
              text-underline-offset: 2px;
            }
            a:hover { 
              color: #1d4ed8; 
              text-decoration-thickness: 2px;
            }
            hr {
              border: none;
              height: 1px;
              background: linear-gradient(to right, transparent, #e5e7eb, transparent);
              margin: 2em 0;
            }
            .mce-content-body {
              background-color: #ffffff;
            }
          `,
          placeholder: placeholder,
          statusbar: true,
          resize: true,
          elementpath: true,
          contextmenu: 'link image imagetools table',
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          quickbars_insert_toolbar: 'quickimage quicktable',
          toolbar_mode: 'sliding',
          menu: {
            file: { title: 'Arquivo', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
            edit: { title: 'Editar', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            view: { title: 'Visualizar', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
            insert: { title: 'Inserir', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
            format: { title: 'Formato', items: 'bold italic underline strikethrough superscript subscript codeformat | blocks fontfamily fontsize align lineheight forecolor backcolor | removeformat' },
            tools: { title: 'Ferramentas', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
            table: { title: 'Tabela', items: 'inserttable | cell row column | tableprops deletetable' },
            help: { title: 'Ajuda', items: 'help' }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setup: (editor: any) => {
            editor.on('init', () => {
              const container = editor.getContainer();
              if (container) {
                container.style.border = '1px solid #d1d5db';
                container.style.borderRadius = '0.5rem';
                container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              }
            });

            // Plugin CTA personalizado
            editor.ui.registry.addButton('yvcta', {
              text: 'CTA',
              icon: 'insert',
              tooltip: 'Inserir CTA YellowVisa',
              onAction: function () {
                openCTAModal(editor);
              }
            });

            // Função para abrir modal CTA
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            function openCTAModal(editor: any) {
              editor.windowManager.open({
                title: 'Configurar CTA YellowVisa',
                body: {
                  type: 'panel',
                  items: [
                    {
                      type: 'input',
                      name: 'title',
                      label: 'Título Principal',
                      placeholder: 'Ex: Quanto custa...'
                    },
                    {
                      type: 'input',
                      name: 'subtitle',
                      label: 'Subtítulo (opcional)',
                      placeholder: 'Ex: Descrição adicional...'
                    },
                    {
                      type: 'textarea',
                      name: 'items',
                      label: 'Itens do CTA (JSON)',
                      placeholder: '[{"title":"Item 1","url":"/url1"},{"title":"Item 2","url":"/url2"}]'
                    }
                  ]
                },
                buttons: [
                  {
                    type: 'cancel',
                    text: 'Cancelar'
                  },
                  {
                    type: 'submit',
                    text: 'Inserir CTA',
                    primary: true
                  }
                ],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSubmit: function (api: any) {
                  const data = api.getData();

                  // Validar dados
                  if (!data.title || !data.items) {
                    editor.notificationManager.open({
                      text: 'Título e itens são obrigatórios',
                      type: 'error'
                    });
                    return;
                  }

                  try {
                    const items = JSON.parse(data.items);

                    // Gerar HTML estruturado
                    const ctaHtml = `<div data-yv-cta="true" data-cta-title="${data.title}" data-cta-subtitle="${data.subtitle || ''}" data-cta-items='${JSON.stringify(items)}'>
                      <div style="background: #f8f9fa; border: 2px dashed #dee2e6; padding: 20px; text-align: center; border-radius: 8px; margin: 10px 0;">
                        <strong>CTA YellowVisa</strong><br/>
                        <small>Título: ${data.title}</small><br/>
                        <small>Itens: ${items.length}</small>
                      </div>
                    </div>`;

                    // Inserir no editor
                    editor.insertContent(ctaHtml);
                    api.close();
                  } catch {
                    editor.notificationManager.open({
                      text: 'Formato JSON inválido nos itens',
                      type: 'error'
                    });
                  }
                }
              });
            }
          },
          // Configurações de imagem
          image_advtab: true,
          image_caption: true,
          image_description: true,
          image_title: true,
          image_uploadtab: true,
          // Configurações de link
          link_assume_external_targets: true,
          link_context_toolbar: true,
          // Configurações de tabela
          table_tab_navigation: true,
          table_clone_elements: 'strong em b i span p div h1 h2 h3 h4 h5 h6',
          // Configurações de código
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' },
            { text: 'TypeScript', value: 'typescript' },
            { text: 'JSON', value: 'json' }
          ],
          // Configurações de autosave
          autosave_ask_before_unload: true,
          autosave_interval: '30s',
          autosave_prefix: 'yellowvisa-{path}{query}-{id}-',
          autosave_retention: '2m',
          // Configurações de acessibilidade
          a11y_advanced_options: true,
          // Configurações de word count
          wordcount_countregex: /[\w\u2019\'-]+/g,
          wordcount_cleanregex: /[0-9.(),;:!?%#$?'"_+=\/\-]*/g,
          // Configurações de upload de imagem (para futuro)
          images_upload_handler: async (blobInfo: { blob: () => Blob; filename: () => string }) => {
            // Aqui você pode implementar upload para S3, Cloudinary, etc.
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve(reader.result as string);
              };
              reader.onerror = () => {
                reject('Erro ao carregar imagem');
              };
              reader.readAsDataURL(blobInfo.blob());
            });
          },
          // Configurações premium
          powerpaste_word_import: 'prompt',
          powerpaste_html_import: 'prompt',
          powerpaste_allow_local_images: true,
          spellchecker_language: 'pt_BR',
          spellchecker_languages: 'Português=pt_BR,English=en_US',
          a11ychecker_level: 'AA',
          mentions: {
            feeds: [
              {
                marker: '@',
                feed: ['@usuario1', '@usuario2', '@usuario3'],
                itemRenderer: (item: { value: string }) => `<div>${item.value}</div>`
              }
            ]
          },
          mediaembed: {
            enablePlaceholder: true,
            placeholderData: 'https://www.youtube.com/watch?v=VIDEO_ID'
          }
        }}
      />
    </div>
  );
}