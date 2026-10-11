"use client";

import React, { useRef, useState, useEffect } from "react";
import { UploadCloud, X, FileCheck, AlertCircle, RefreshCw } from "lucide-react";

export default function ImageUploader({ imageBase64, mimeType, fileName, fileSize, onImageSelected, onImageRemoved }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const processFile = (file) => {
    setErrorMsg(null);
    if (!file) return;

    // Validate MIME types
    const validMimes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validMimes.includes(file.type.toLowerCase())) {
      setErrorMsg("Unsupported file format. Please upload PNG, JPG, or WEBP.");
      return;
    }

    // Max 8MB
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 8MB. Please compress or select a smaller screenshot.");
      return;
    }

    if (file.size === 0) {
      setErrorMsg("Uploaded file is empty. Please choose a valid screenshot.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const formattedSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(1)} KB`;

      onImageSelected({
        base64,
        mimeType: file.type || "image/jpeg",
        name: file.name || "screenshot.png",
        size: formattedSize,
      });
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  if (imageBase64) {
    return (
      <div className="relative border border-accent/30 bg-accent-subtle/20 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3 transition-all animate-fadeIn">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-border bg-surface flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageBase64}
              alt="Screenshot preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary truncate">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{fileName || "Screenshot captured"}</span>
            </div>
            <p className="text-[11px] text-text-muted mt-0.5">
              {fileSize || "Ready for OCR"} • Optical layout and seal forensics
            </p>
            <div className="text-[10px] text-accent font-medium mt-1">
              ✓ Attached to scan
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors text-xs flex items-center gap-1"
            title="Replace screenshot"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replace</span>
          </button>
          <button
            type="button"
            onClick={onImageRemoved}
            className="p-1.5 rounded-lg border border-border bg-surface text-text-muted hover:text-red-600 hover:border-red-200 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 sm:p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-accent bg-accent-subtle/50 scale-[0.99]"
            : "border-border hover:border-accent/60 hover:bg-surface-elevated/50 bg-surface"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              <span className="text-accent underline font-semibold">Upload screenshot</span> or drag and drop
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              PNG, JPG, or WEBP up to 8MB • Direct paste <kbd className="px-1 py-0.5 rounded bg-surface-elevated border border-border text-[10px] font-mono">Ctrl+V</kbd> supported
            </p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200 dark:border-red-900">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
