import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import type { NewsletterConfig } from './siteFooter.types';
import { DEFAULT_NEWSLETTER_CONFIG } from '../../../data/site/footerData';
import { extractErrorMessage } from '../../../lib/apiErrors';
import './NewsletterPanel.css';

export interface NewsletterPanelProps {
  config?: Partial<NewsletterConfig>;
  onSubscribe?: (email: string) => Promise<boolean>;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function NewsletterPanel({ config, onSubscribe }: NewsletterPanelProps) {
  const finalConfig: NewsletterConfig = { ...DEFAULT_NEWSLETTER_CONFIG, ...config };
  const [email, setEmail] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submissionState === 'submitting') return;

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
      setSubmissionState('error');
      setFeedbackMessage('Enter a valid email address.');
      return;
    }

    setSubmissionState('submitting');
    setFeedbackMessage('');

    if (onSubscribe) {
      try {
        const success = await onSubscribe(trimmed);
        if (success) {
          setSubmissionState('success');
          setFeedbackMessage("You're on the list. Thank you for subscribing.");
          setEmail('');
        } else {
          setSubmissionState('error');
          setFeedbackMessage("We couldn't complete your subscription. Please try again.");
        }
      } catch {
        setSubmissionState('error');
        setFeedbackMessage("We couldn't complete your subscription. Please try again.");
      }
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: trimmed }),
      });

      const data: unknown = await response.json().catch(() => ({}));

      const isSuccess =
        response.ok &&
        typeof data === 'object' &&
        data !== null &&
        Boolean((data as Record<string, unknown>).success);

      if (isSuccess) {
        setSubmissionState('success');
        const successMsg =
          typeof (data as Record<string, unknown>).message === 'string'
            ? ((data as Record<string, unknown>).message as string)
            : "You're on the list. Thank you for subscribing.";
        setFeedbackMessage(successMsg);
        setEmail('');
      } else {
        setSubmissionState('error');
        const errorMsg = extractErrorMessage(
          data,
          "We couldn't complete your subscription. Please try again."
        );
        setFeedbackMessage(errorMsg);
      }
    } catch {
      setSubmissionState('error');
      setFeedbackMessage("We couldn't complete your subscription. Please try again.");
    }
  };

  return (
    <div className="sf-newsletter" aria-labelledby="newsletter-headline">
      <div className="sf-newsletter__inner">
        {/* Left Column: Clean Architectural Visual Frame */}
        <div className="sf-newsletter__visual-wrap">
          <img
            src={finalConfig.image}
            alt={finalConfig.imageAlt || 'Architectural joinery specification detail'}
            className="sf-newsletter__image"
            loading="lazy"
            decoding="async"
          />
          <div className="sf-newsletter__visual-scrim" aria-hidden="true" />
        </div>

        {/* Right Column: Editorial Value Proposition & Frosted Input Form */}
        <div className="sf-newsletter__content">
          <div className="sf-newsletter__header">
            {finalConfig.eyebrow && (
              <span className="sf-newsletter__eyebrow">
                {finalConfig.eyebrow}
              </span>
            )}
            <h2 id="newsletter-headline" className="sf-newsletter__title">
              {finalConfig.title}
            </h2>
            {finalConfig.description && (
              <p className="sf-newsletter__desc">{finalConfig.description}</p>
            )}
          </div>

          {/* Subscription Form with Unified Frosted Pill Field */}
          <form className="sf-newsletter__form" onSubmit={handleSubmit} noValidate>
            <div className="sf-newsletter__pill-field">
              <label htmlFor="newsletter-email-input" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email-input"
                name="email"
                type="email"
                autoComplete="email"
                className={`sf-newsletter__input ${
                  submissionState === 'error'
                    ? 'sf-newsletter__input--error'
                    : submissionState === 'success'
                    ? 'sf-newsletter__input--success'
                    : ''
                }`}
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submissionState !== 'idle') {
                    setSubmissionState('idle');
                    setFeedbackMessage('');
                  }
                }}
                disabled={submissionState === 'submitting'}
                aria-describedby="newsletter-feedback"
              />

              <Button
                type="submit"
                variant="bronze"
                className="sf-newsletter__submit-btn"
                disabled={submissionState === 'submitting'}
              >
                {submissionState === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>

            {/* Feedback Notifications */}
            {submissionState !== 'idle' && feedbackMessage && (
              <div
                id="newsletter-feedback"
                className={`sf-newsletter__feedback sf-newsletter__feedback--${submissionState}`}
                role={submissionState === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {submissionState === 'error' && (
                  <svg
                    className="sf-newsletter__feedback-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 4zm0 8a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                )}
                {submissionState === 'success' && (
                  <svg
                    className="sf-newsletter__feedback-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.22 5.28a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L7 9.94l3.47-3.47a.75.75 0 011.06 0z" />
                  </svg>
                )}
                <span>
                  {typeof feedbackMessage === 'string'
                    ? feedbackMessage
                    : (feedbackMessage && typeof feedbackMessage === 'object' && 'message' in feedbackMessage)
                      ? String((feedbackMessage as { message: unknown }).message)
                      : "We couldn't complete your subscription. Please try again."}
                </span>
              </div>
            )}

            <p className="sf-newsletter__privacy">
              {finalConfig.privacyNote}{' '}
              {finalConfig.privacyLinkTo && (
                <Link to={finalConfig.privacyLinkTo} className="sf-newsletter__privacy-link">
                  Privacy Policy
                </Link>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
