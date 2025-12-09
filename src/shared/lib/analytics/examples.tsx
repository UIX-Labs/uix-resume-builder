/**
 * Example Analytics Integration Components
 * 
 * This file demonstrates how to integrate Percept analytics
 * into various components of the resume builder application.
 */

"use client";

import { trackEvent, startTimedEvent } from '@shared/lib/analytics/Mixpanel';
import { useState } from 'react';

// ============================================
// Example 1: Track Button Clicks
// ============================================
export function AnalyticsButton() {
  const handleClick = () => {
    trackEvent('button_clicked', {
      buttonId: 'cta-button',
      section: 'hero',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <button onClick={handleClick}>
      Click Me (Tracked)
    </button>
  );
}

// ============================================
// Example 2: Track Template Selection
// ============================================
export function TemplateCard({
  templateId,
  templateName
}: {
  templateId: string;
  templateName: string;
}) {
  const handleSelect = () => {
    trackEvent('template_selected', {
      templateId,
      templateName,
      category: 'professional',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div onClick={handleSelect}>
      <h3>{templateName}</h3>
      <button>Select Template</button>
    </div>
  );
}

// ============================================
// Example 3: Track Form Submission
// ============================================
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    trackEvent('form_submitted', {
      formType: 'contact',
      fields: Object.keys(formData),
      hasAllFields: Object.values(formData).every(v => v.length > 0)
    });

    // Submit form...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}

// ============================================
// Example 4: Track Resume Download with Timing
// ============================================
export function DownloadResumeButton() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    // Start timing the download process
    startTimedEvent('resume_download');

    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Track successful download (duration is automatically included)
      trackEvent('resume_download', {
        status: 'success',
        format: 'pdf',
        pageCount: 2
      });


    } catch (error) {
      // Track failed download
      trackEvent('resume_download', {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? 'Downloading...' : 'Download Resume'}
    </button>
  );
}

// ============================================
// Example 5: Track Section Addition
// ============================================
export function AddSectionButton({ sectionType }: { sectionType: string }) {
  const handleAddSection = () => {
    trackEvent('section_added', {
      sectionType,
      timestamp: new Date().toISOString()
    });

    // Add section logic...
  };

  return (
    <button onClick={handleAddSection}>
      Add {sectionType} Section
    </button>
  );
}

// ============================================
// Example 6: Track AI Suggestion Acceptance
// ============================================
export function AISuggestion({
  suggestion,
  section
}: {
  suggestion: string;
  section: string;
}) {
  const handleAccept = () => {
    trackEvent('ai_suggestion_accepted', {
      suggestionType: 'content',
      section,
      suggestionLength: suggestion.length
    });

    // Apply suggestion...
  };

  const handleReject = () => {
    trackEvent('ai_suggestion_rejected', {
      suggestionType: 'content',
      section
    });
  };

  return (
    <div>
      <p>{suggestion}</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}

// ============================================
// Example 7: Track Resume Export
// ============================================
export function ExportButton() {
  const handleExport = (format: 'pdf' | 'docx' | 'txt') => {
    trackEvent('resume_exported', {
      format,
      timestamp: new Date().toISOString(),
      source: 'export_menu'
    });

    // Export logic...
  };

  return (
    <div>
      <button onClick={() => handleExport('pdf')}>Export as PDF</button>
      <button onClick={() => handleExport('docx')}>Export as DOCX</button>
      <button onClick={() => handleExport('txt')}>Export as TXT</button>
    </div>
  );
}

// ============================================
// Example 8: Track Error Events
// ============================================
export function ErrorBoundaryExample() {
  const handleOperation = async () => {
    try {
      // Some operation that might fail
      await riskyOperation();

      trackEvent('operation_success', {
        operation: 'data_sync'
      });
    } catch (error) {
      trackEvent('operation_error', {
        operation: 'data_sync',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : 'Unknown'
      });
    }
  };

  return (
    <button onClick={handleOperation}>
      Perform Operation
    </button>
  );
}

// Dummy function for example
async function riskyOperation() {
  // Simulated operation
  return Promise.resolve();
}
