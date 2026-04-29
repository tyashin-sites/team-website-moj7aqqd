'use client';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const fullUrl = typeof window !== 'undefined' ? window.location.origin + url : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>
      
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>
      
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      
      <button
        onClick={copyToClipboard}
        className={`p-3 rounded-lg transition-colors ${
          copied 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Copy link"
      >
        <LinkIcon className="w-5 h-5" />
      </button>
      
      {copied && (
        <span className="text-sm text-green-600 font-medium">
          Link copied!
        </span>
      )}
    </div>
  );
}