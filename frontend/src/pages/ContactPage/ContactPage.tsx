import './ContactPage.css';

import { Link, useSearchParams } from 'react-router-dom';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import Button from '../../components/ui/Button';
import ContactHero from './components/ContactHero';
import { SEOHead, buildBreadcrumbSchema, buildOrganizationSchema } from '../../components/seo';
import { getEnquiryContext } from '../../lib/enquiryContext';
import { buildCloudinaryThumb } from '../../lib/cloudinary';
import { extractErrorMessage } from '../../lib/apiErrors';
import {
  generateEnquiryMessage,
  updateMessageCustomerName,
  type MessageContextData,
} from '../../lib/enquiryMessageGenerator';

/**
 * SURFURIA — Contact Page
 *
 * Cinematic, high-conversion enquiry experience with intelligent cross-field
 * validation (email OR phone mandatory, both optional individually) and
 * Brevo email delivery via Vercel Serverless Function (/api/contact).
 */
const CONTACT_API_ENDPOINT = '/api/contact';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormTouched {
  name: boolean;
  email: boolean;
  phone: boolean;
  message: boolean;
  submitted: boolean;
}

/**
 * Validates the contact form according to the business cross-field requirement:
 * - Name is required.
 * - Message is required.
 * - At least one of Email or Phone must be provided and valid.
 * - If Email is provided, it must be valid.
 * - If Phone is provided, it must be valid.
 */
function validateForm(values: FormValues, touched: FormTouched) {
  const { name, email, phone, message } = values;
  const { name: nameT, email: emailT, phone: phoneT, message: msgT, submitted } = touched;

  // Name
  let nameError = '';
  if (submitted || nameT) {
    if (!name.trim()) {
      nameError = 'Please enter your name.';
    }
  }

  // Message
  let messageError = '';
  if (submitted || msgT) {
    if (!message.trim()) {
      messageError = 'Please add a message before sending your enquiry.';
    }
  }

  const emailTrimmed = email.trim();
  const phoneTrimmed = phone.trim();

  const isEmailProvided = emailTrimmed.length > 0;
  const isPhoneProvided = phoneTrimmed.length > 0;

  // Standard valid email regex
  const isEmailValid =
    isEmailProvided && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailTrimmed);

  // Phone validation: allows digits, spaces, parentheses, +, hyphens, 7-15 digits
  const phoneDigits = phoneTrimmed.replace(/\D/g, '');
  const hasValidPhoneChars = /^[+\d\s().-]+$/.test(phoneTrimmed);
  const isPhoneValid =
    isPhoneProvided &&
    hasValidPhoneChars &&
    phoneDigits.length >= 7 &&
    phoneDigits.length <= 15;

  let emailError = '';
  if ((submitted || emailT) && isEmailProvided && !isEmailValid) {
    emailError = 'Enter a valid email address.';
  }

  let phoneError = '';
  if ((submitted || phoneT) && isPhoneProvided && !isPhoneValid) {
    phoneError = 'Enter a valid phone number.';
  }

  // Cross-field requirement:
  // At least one valid contact method must be provided.
  let contactError = '';
  const hasAtLeastOneValidContact = isEmailValid || isPhoneValid;

  if (!hasAtLeastOneValidContact) {
    // If neither is provided, show cross-field error after submit or when both fields were touched
    if (!isEmailProvided && !isPhoneProvided) {
      if (submitted || (emailT && phoneT)) {
        contactError = 'Add an email address or phone number so we know how to reach you.';
      }
    }
  }

  const isValid =
    name.trim().length > 0 &&
    message.trim().length > 0 &&
    hasAtLeastOneValidContact &&
    !emailError &&
    !phoneError;

  return {
    nameError,
    emailError,
    phoneError,
    contactError,
    messageError,
    isValid,
    isEmailValid,
    isPhoneValid,
  };
}

export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useMemo(() => getEnquiryContext(searchParams), [searchParams]);

  // Context key for remounting and re-syncing form prefill when URL params change
  const contextKey = `${context.type}::${context.title}`;

  // Slugs for server-side verified resolution
  const productSlug =
    context.type === 'hardware-product'
      ? searchParams.get('product') || undefined
      : undefined;

  const configurationSlug =
    context.type === 'kitchen-config'
      ? searchParams.get('product') ||
        searchParams.get('layout') ||
        searchParams.get('configuration') ||
        undefined
      : undefined;

  const handleClearContext = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete('type');
    next.delete('product');
    next.delete('layout');
    next.delete('configuration');
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildOrganizationSchema(),
        buildBreadcrumbSchema([
          { name: 'Home', url: 'https://surfuria.com/' },
          { name: 'Contact', url: 'https://surfuria.com/contact' },
        ]),
      ],
    };
  }, []);

  return (
    <div className="cp-page container--wide">
      <SEOHead
        title="Contact Surfuria | Kitchen & Furniture Hardware Enquiries"
        description="Connect directly with Surfuria's specification studio in Indore, MP. Enquire about modular kitchen configurations, hardware finishes, or architectural quotes."
        canonicalUrl="https://surfuria.com/contact"
        ogType="website"
        jsonLd={jsonLd}
      />
      <div className="cp-layout">
        {/* ================================================================
            LEFT COLUMN: Cinematic Studio Hero, Context, WhatsApp & Direct
            ================================================================ */}
        <aside className="cp-story-column" aria-label="About our specification studio">
          <ContactHero />

          {/* Active Context Banner (if user arrived from a kitchen config or hardware product) */}
          {context.type !== 'general' && (
            <section className="cp-banner" aria-label="Active enquiry context">
              {context.thumbnail && (
                <div className="cp-banner__thumb">
                  <img
                    src={buildCloudinaryThumb(context.thumbnail, 160)}
                    alt={context.thumbnailAlt ?? context.title}
                    className="cp-banner__img"
                    loading="lazy"
                    decoding="async"
                    width={80}
                    height={80}
                  />
                </div>
              )}

              <div className="cp-banner__body">
                {context.badge && (
                  <span className="cp-banner__badge">{context.badge}</span>
                )}
                <h2 className="cp-banner__title">{context.title}</h2>
                {context.price && (
                  <span className="cp-banner__price">{context.price}</span>
                )}
              </div>

              <div className="cp-banner__actions">
                {context.detailUrl && (
                  <Link to={context.detailUrl} className="cp-banner__view-link">
                    View Details
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleClearContext}
                  className="cp-banner__clear-btn"
                  title="Clear active context"
                >
                  × Clear
                </button>
              </div>
            </section>
          )}

          {/* Direct WhatsApp Alternative Card */}
          <div className="cp-whatsapp-card">
            <div className="cp-whatsapp-card__header">
              <span className="cp-whatsapp-card__eyebrow">FAST DIRECT LINE</span>
              <h3 className="cp-whatsapp-card__title">Prefer WhatsApp?</h3>
              <p className="cp-whatsapp-card__desc">
                Chat with our team on +91 9424602091.
              </p>
            </div>
            <a
              href={context.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-whatsapp-card__btn"
              aria-label="Chat with Surfuria on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="cp-whatsapp-card__icon"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Direct Call & Email Option */}
          <div className="cp-direct-contact">
            <div className="cp-direct-contact__item">
              <span className="cp-direct-contact__label">Speak with our studio:</span>
              <a
                href="tel:+919424602091"
                className="cp-direct-contact__link cp-direct-contact__link--call"
                aria-label="Call Surfuria directly at 9424602091"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="cp-direct-contact__action-text">Call Us</span>
                <span className="cp-direct-contact__phone-number">9424602091</span>
              </a>
            </div>
            <div className="cp-direct-contact__item">
              <span className="cp-direct-contact__label">Or email us directly:</span>
              <a href="mailto:info@surfuria.com" className="cp-direct-contact__link">
                info@surfuria.com
              </a>
            </div>
          </div>
        </aside>

        {/* ================================================================
            RIGHT COLUMN: The High-Conversion Enquiry Form
            ================================================================ */}
        <section
          id="enquiry-form"
          className="cp-form-column"
          aria-labelledby="enquiry-form-title"
        >
          <EnquiryForm
            key={contextKey}
            prefillMessage={context.prefillMessage}
            formTitle={context.formTitle}
            contextType={context.type}
            contextTitle={context.title}
            whatsAppUrl={context.whatsAppUrl}
            productSlug={productSlug}
            configurationSlug={configurationSlug}
            contextData={context.contextData}
          />
        </section>
      </div>
    </div>
  );
}

/* ==========================================================================
   Inner Enquiry Form Component
   ========================================================================== */
interface EnquiryFormProps {
  prefillMessage: string;
  formTitle: string;
  contextType: string;
  contextTitle: string;
  whatsAppUrl: string;
  productSlug?: string;
  configurationSlug?: string;
  contextData: MessageContextData;
}

function EnquiryForm({
  prefillMessage,
  formTitle,
  contextType,
  contextTitle,
  whatsAppUrl,
  productSlug,
  configurationSlug,
  contextData,
}: EnquiryFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: prefillMessage,
  });

  const [isMessageManuallyEdited, setIsMessageManuallyEdited] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    phone: false,
    message: false,
    submitted: false,
  });

  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Field refs for accessible focus management
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Compute validation state reactively
  const validation = useMemo(() => validateForm(values, touched), [values, touched]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'message') {
      setIsMessageManuallyEdited(true);
      setValues((prev) => ({ ...prev, message: value }));
      return;
    }

    if (name === 'name') {
      const newName = value;
      setValues((prev) => {
        const updatedMessage = !isMessageManuallyEdited
          ? generateEnquiryMessage(contextData, newName)
          : updateMessageCustomerName(prev.message, newName);
        return { ...prev, name: newName, message: updatedMessage };
      });
      return;
    }

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof FormTouched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitTouched: FormTouched = {
      name: true,
      email: true,
      phone: true,
      message: true,
      submitted: true,
    };
    setTouched(submitTouched);

    const submitValidation = validateForm(values, submitTouched);

    if (!submitValidation.isValid) {
      // Focus the first field with an error
      if (submitValidation.nameError) nameRef.current?.focus();
      else if (submitValidation.contactError) emailRef.current?.focus();
      else if (submitValidation.emailError) emailRef.current?.focus();
      else if (submitValidation.phoneError) phoneRef.current?.focus();
      else if (submitValidation.messageError) messageRef.current?.focus();
      return;
    }

    setSubmitState('submitting');
    setErrorMessage('');

    try {
      const payload: Record<string, string> = {
        name: values.name.trim(),
        message: values.message.trim(),
      };
      if (values.email.trim()) payload.email = values.email.trim();
      if (values.phone.trim()) payload.phone = values.phone.trim();
      if (configurationSlug) payload.configurationSlug = configurationSlug;
      if (contextType === 'kitchen-config') payload.configurationName = contextTitle;
      if (productSlug) payload.productSlug = productSlug;
      if (contextType === 'hardware-product') payload.productName = contextTitle;
      if (typeof window !== 'undefined' && window.location?.href) {
        payload.pageUrl = window.location.href;
      }
      if (honeypot) payload.hp = honeypot;

      const res = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: unknown = await res.json().catch(() => ({}));

      const isSuccess =
        res.ok &&
        typeof data === 'object' &&
        data !== null &&
        Boolean((data as Record<string, unknown>).success);

      if (isSuccess) {
        setSubmitState('success');
      } else {
        const errorMsg = extractErrorMessage(
          data,
          'Email delivery could not be completed at this time. Please retry or contact us on WhatsApp.'
        );
        setErrorMessage(errorMsg);
        setSubmitState('error');
      }
    } catch {
      setErrorMessage(
        'Network error encountered. Please check your connection and retry.'
      );
      setSubmitState('error');
    }
  };

  const handleReset = () => {
    setSubmitState('idle');
    setErrorMessage('');
    setHoneypot('');
    setIsMessageManuallyEdited(false);
    setValues({
      name: '',
      email: '',
      phone: '',
      message: generateEnquiryMessage(contextData, ''),
    });
    setTouched({
      name: false,
      email: false,
      phone: false,
      message: false,
      submitted: false,
    });
  };

  // ========================================================================
  // SUCCESS FEEDBACK STATE
  // Refined confirmation: "Your enquiry has been received."
  // ========================================================================
  if (submitState === 'success') {
    return (
      <div className="cp-success-card" role="alert" aria-live="polite">
        <div className="cp-success-card__icon" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="cp-success-card__eyebrow">MESSAGE DISPATCHED</span>
        <h3 className="cp-success-card__title">Your enquiry has been received.</h3>
        <p className="cp-success-card__desc">
          We'll review your message and get back to you.
        </p>

        <div className="cp-success-card__actions">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-success-card__whatsapp-btn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Continue on WhatsApp</span>
          </a>
          <Button
            type="button"
            variant="bronze"
            onClick={handleReset}
            className="cp-success-card__reset-btn"
            icon={
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            }
          >
            Send Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  // ========================================================================
  // ACTIVE FORM INTERFACE
  // ========================================================================
  return (
    <div className="cp-form-container">
      <div className="cp-form-header">
        <span className="cp-form-header__eyebrow">ENQUIRY FORM</span>
        <h2 id="enquiry-form-title" className="cp-form-header__title">
          {formTitle}
        </h2>
        <p className="cp-form-header__reassurance">
          Not sure where to start? Tell us what you have in mind, and we'll help
          you with the next step.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="cp-form" noValidate>
        {/* Anti-spam honeypot field (hidden from real users, immune to browser autofill) */}
        <div
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            opacity: 0,
            height: 0,
            width: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
          tabIndex={-1}
        >
          <label htmlFor="cp-hp" tabIndex={-1} aria-hidden="true">
            Leave blank
          </label>
          <input
            id="cp-hp"
            type="text"
            name="hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </div>

        {/* ==============================================================
            FIELD 1 — Name
            ============================================================== */}
        <div className="cp-field">
          <div className="cp-field__label-row">
            <label htmlFor="cp-name" className="cp-label">
              What should we call you?
            </label>
            <span className="cp-field__badge cp-field__badge--required">
              Required
            </span>
          </div>
          <input
            ref={nameRef}
            id="cp-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            placeholder="Your name"
            className={`cp-input${validation.nameError ? ' cp-input--error' : ''}`}
            aria-required="true"
            aria-invalid={validation.nameError ? 'true' : undefined}
            aria-describedby={
              validation.nameError ? 'cp-name-error' : undefined
            }
          />
          {validation.nameError && (
            <span id="cp-name-error" className="cp-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {validation.nameError}
            </span>
          )}
        </div>

        {/* ==============================================================
            CONTACT METHOD REQUIREMENT HELPER NOTE
            ============================================================== */}
        <div className="cp-contact-group">
          <div className="cp-contact-group__banner">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Email or phone is enough. Choose whichever works best for you.</span>
          </div>

          {/* Cross-field error when both are empty upon blur/submission */}
          {validation.contactError && (
            <div id="cp-contact-cross-error" className="cp-cross-error" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{validation.contactError}</span>
            </div>
          )}

          {/* ============================================================
              FIELD 2 — Email
              ============================================================ */}
          <div className="cp-field">
            <div className="cp-field__label-row">
              <label htmlFor="cp-email" className="cp-label">
                Where can we email you?
              </label>
              <span className="cp-field__badge cp-field__badge--optional">
                Optional
              </span>
            </div>
            <input
              ref={emailRef}
              id="cp-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="you@example.com"
              className={`cp-input${validation.emailError || (validation.contactError && !values.phone.trim()) ? ' cp-input--error' : ''}`}
              aria-invalid={validation.emailError ? 'true' : undefined}
              aria-describedby={
                validation.emailError
                  ? 'cp-email-error'
                  : validation.contactError
                  ? 'cp-contact-cross-error'
                  : undefined
              }
            />
            {validation.emailError && (
              <span id="cp-email-error" className="cp-error" role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {validation.emailError}
              </span>
            )}
          </div>

          {/* ============================================================
              FIELD 3 — Phone
              ============================================================ */}
          <div className="cp-field">
            <div className="cp-field__label-row">
              <label htmlFor="cp-phone" className="cp-label">
                Where can we reach you by phone or WhatsApp?
              </label>
              <span className="cp-field__badge cp-field__badge--optional">
                Optional
              </span>
            </div>
            <input
              ref={phoneRef}
              id="cp-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              placeholder="Your contact number"
              className={`cp-input${validation.phoneError || (validation.contactError && !values.email.trim()) ? ' cp-input--error' : ''}`}
              aria-invalid={validation.phoneError ? 'true' : undefined}
              aria-describedby={
                validation.phoneError
                  ? 'cp-phone-error'
                  : validation.contactError
                  ? 'cp-contact-cross-error'
                  : undefined
              }
            />
            {validation.phoneError && (
              <span id="cp-phone-error" className="cp-error" role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {validation.phoneError}
              </span>
            )}
          </div>
        </div>

        {/* ==============================================================
            FIELD 4 — Message
            ============================================================== */}
        <div className="cp-field">
          <div className="cp-field__label-row">
            <label htmlFor="cp-message" className="cp-label">
              What would you like to know?
            </label>
            <span className="cp-field__badge cp-field__badge--required">
              Required
            </span>
          </div>
          <textarea
            ref={messageRef}
            id="cp-message"
            name="message"
            required
            rows={5}
            value={values.message}
            onChange={handleChange}
            onBlur={() => handleBlur('message')}
            placeholder="Tell us about your project or ask us anything…"
            className={`cp-textarea${validation.messageError ? ' cp-input--error' : ''}`}
            aria-required="true"
            aria-invalid={validation.messageError ? 'true' : undefined}
            aria-describedby={
              validation.messageError ? 'cp-message-error' : undefined
            }
          />
          {validation.messageError && (
            <span id="cp-message-error" className="cp-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {validation.messageError}
            </span>
          )}
        </div>

        {/* Privacy Line */}
        <p className="cp-privacy-note">
          We'll use your contact details to respond to your enquiry only.
        </p>

        {/* Server or Configuration Error Alert */}
        {submitState === 'error' && errorMessage && (
          <div className="cp-submit-error" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div className="cp-submit-error__content">
              <span>
                {typeof errorMessage === 'string'
                  ? errorMessage
                  : (errorMessage && typeof errorMessage === 'object' && 'message' in errorMessage)
                    ? String((errorMessage as { message: unknown }).message)
                    : 'Email delivery could not be completed at this time. Please retry or contact us on WhatsApp.'}
              </span>
            </div>
          </div>
        )}

        {/* Primary CTA Button */}
        <Button
          type="submit"
          variant="bronze"
          disabled={submitState === 'submitting'}
          className="cp-submit-btn"
        >
          {submitState === 'submitting' ? 'Sending Enquiry...' : 'Send Enquiry'}
        </Button>
      </form>
    </div>
  );
}
