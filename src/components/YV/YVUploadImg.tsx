'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Link, Image as ImageIcon, FileImage } from 'lucide-react';
import { YVTextField, YVButton } from '@/components/YV';

interface YVUploadImgProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export default function YVUploadImg({
  value = '',
  onChange,
  placeholder = 'https://exemplo.com/imagem.jpg',
  disabled = false,
  error,
  className = ''
}: YVUploadImgProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Criar FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('file', file);

      // Upload direto para Vercel Blob
      const response = await fetch('/api/media/upload-url', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await response.json();
      onChange(url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erro no upload. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: disabled || isUploading
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Preview da imagem */}
      {value && (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-gray-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={disabled}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Área de Drop */}
      {!value && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${isDragActive
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-4">
            {isDragActive ? (
              <>
                <FileImage size={48} className="text-yellow-500" />
                <div>
                  <p className="text-lg font-medium text-yellow-600">Solte a imagem aqui</p>
                  <p className="text-sm text-yellow-500">Arraste e solte sua imagem</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-gray-100 rounded-full">
                  <ImageIcon size={32} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {isUploading ? 'Enviando...' : 'Arraste uma imagem aqui'}
                  </p>
                  <p className="text-sm text-gray-500">
                    ou clique para selecionar um arquivo
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  PNG, JPG, GIF até 1MB
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Botão de URL */}
      {!value && (
        <div className="flex justify-center">
          <YVButton

            onClick={() => setShowUrlInput(!showUrlInput)}
            disabled={disabled}
            variant="secondary"
            size="md"
            className="flex items-center gap-2"
          >
            <Link size={16} />
            {showUrlInput ? 'Cancelar' : 'Ou cole URL'}
          </YVButton>
        </div>
      )}

      {/* Input de URL */}
      {showUrlInput && (
        <YVTextField
          type="url"
          placeholder={placeholder}
          value={value}
          onChange={handleUrlChange}
          disabled={disabled}
          error={error}
          variant="modern"
          size="md"
        />
      )}

      {/* Mensagem de erro */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}