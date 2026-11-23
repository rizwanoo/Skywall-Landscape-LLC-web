import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Instagram,
  MapPin,
  MessageSquare,
  Phone,
  Upload,
  X,
} from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BUSINESS_INFO, ServiceOption } from '../lib/siteData';

interface ContactPageProps {
  prefillService?: ServiceOption;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  'Paver Installation',
  'Artificial Turf',
  'Yard Cleanup',
  'Irrigation',
  'Multiple Services',
  'Other',
];

const CONTACT_METHODS = ['Phone Call', 'Text Message', 'Email'] as const;

interface SubmissionReceipt {
  referenceId: string;
  submittedAt: string;
  photoSaved: boolean;
}

export function ContactPage({ prefillService }: ContactPageProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [serviceRequired, setServiceRequired] = useState<ServiceOption>(
    prefillService || 'Paver Installation'
  );
  const [projectSize, setProjectSize] = useState('');
  const [description, setDescription] = useState('');
  const [preferredContact, setPreferredContact] =
    useState<(typeof CONTACT_METHODS)[number]>('Phone Call');

  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  useEffect(() => {
    if (prefillService) {
      setServiceRequired(prefillService);
    }
  }, [prefillService]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setPhotoError('Please upload a JPEG, PNG, or WebP photograph.');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Please choose an image smaller than 5 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoFileName(file.name);
        setPhotoDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoFileName(null);
    setPhotoDataUrl(null);
    setPhotoError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (fullName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (propertyLocation.trim().length < 2) {
      setFormError('Please enter your Las Vegas neighborhood or ZIP code.');
      return;
    }
    if (description.trim().length < 10) {
      setFormError('Please provide a brief description of your landscaping project.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          propertyLocation: propertyLocation.trim(),
          serviceRequired,
          projectSize: projectSize.trim(),
          description: description.trim(),
          preferredContact,
          photo:
            photoDataUrl && photoFileName
              ? { dataUrl: photoDataUrl, fileName: photoFileName }
              : null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not submit your estimate request.');
      }

      setReceipt({
        referenceId: data.referenceId,
        submittedAt: data.submittedAt,
        photoSaved: Boolean(data.photoSaved),
      });
    } catch (err) {
      setFormError(
        err instanceof Error
          ? `${err.message} You can also call or text us directly at ${BUSINESS_INFO.phoneDisplay}.`
          : `Unable to submit online right now. Please call or text ${BUSINESS_INFO.phoneDisplay}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setPropertyLocation('');
    setProjectSize('');
    setDescription('');
    clearPhoto();
    setReceipt(null);
    setFormError(null);
  };

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="border-b border-[#DCD6C8] bg-[#EFECE4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F523B]">
              Contact & Free Estimate
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-[#1E201D] sm:text-5xl">
              {BUSINESS_INFO.serviceAreaHeadline}
            </h1>
            <p className="text-base leading-relaxed text-[#5B5D56] sm:text-lg">
              Call, text, or complete the form below to tell us about your paver, artificial
              turf, yard cleanup, or irrigation project.
            </p>
          </div>

          {/* Direct Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-3 border-t border-[#DCD6C8] pt-6">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#3F523B] px-6 py-3 text-sm font-semibold text-[#FAF8F4] transition-colors hover:bg-[#32422E] whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call Now ({BUSINESS_INFO.phoneDisplay})</span>
            </a>

            <a
              href={BUSINESS_INFO.smsHref}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#1E201D] bg-[#FAF8F4] px-6 py-3 text-sm font-semibold text-[#1E201D] transition-colors hover:bg-[#1E201D] hover:text-[#FAF8F4] whitespace-nowrap shrink-0"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>Text Us</span>
            </a>

            <a
              href="#estimate-form"
              className="inline-flex min-h-[48px] items-center justify-center border border-[#DCD6C8] bg-[#FAF8F4] px-6 py-3 text-sm font-semibold text-[#1E201D] transition-colors hover:border-[#3F523B] whitespace-nowrap shrink-0"
            >
              Request a Free Estimate
            </a>

            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#DCD6C8] bg-[#FAF8F4] px-5 py-3 text-sm font-semibold text-[#1E201D] transition-colors hover:border-[#3F523B] whitespace-nowrap shrink-0"
            >
              <Instagram className="h-4 w-4 text-[#3F523B]" aria-hidden="true" />
              <span>Follow on Instagram</span>
              <ArrowUpRight className="h-4 w-4 text-[#5B5D56]" aria-hidden="true" />
            </a>

            <a
              href={BUSINESS_INFO.yelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#DCD6C8] bg-[#FAF8F4] px-5 py-3 text-sm font-semibold text-[#1E201D] transition-colors hover:border-[#3F523B] whitespace-nowrap shrink-0"
            >
              <span>Read Customer Reviews on Yelp</span>
              <ArrowUpRight className="h-4 w-4 text-[#5B5D56]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content: Business Details + Free Estimate Form */}
      <section className="bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Info Rail */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="border border-[#DCD6C8] bg-[#EFECE4] p-7 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={BUSINESS_INFO.logoUrl}
                    alt="Skywall Landscape LLC crest logo"
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 rounded-full object-cover border-2 border-[#C9A24D]/75 shrink-0"
                  />
                  <div className="space-y-1">
                    <h2 className="font-display text-xl font-semibold text-[#1E201D]">
                      {BUSINESS_INFO.name}
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#3F523B]">
                      Las Vegas, Nevada
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#5B5D56]">
                  Serving homeowners throughout Las Vegas, Nevada with pavers, artificial
                  turf, yard cleanups, and irrigation.
                </p>

                <div className="space-y-4 border-t border-[#DCD6C8] pt-5 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#3F523B]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-[#1E201D]">Service Area</p>
                      <p className="text-[#5B5D56]">{BUSINESS_INFO.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#3F523B]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-[#1E201D]">Phone & Text</p>
                      <a
                        href={BUSINESS_INFO.phoneHref}
                        className="text-[#3F523B] font-semibold hover:underline tabular-nums"
                      >
                        {BUSINESS_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[#DCD6C8] bg-white p-7 space-y-4">
                <h3 className="font-display text-base font-semibold text-[#1E201D]">
                  Prefer Direct Contact?
                </h3>
                <p className="text-sm leading-relaxed text-[#5B5D56]">
                  Calling or texting is often the quickest way to discuss your yard, share
                  photos, and schedule an assessment.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#1E201D] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF8F4] hover:bg-[#3F523B] transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Call</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.smsHref}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#1E201D] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1E201D] hover:bg-[#EFECE4] transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Text</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Estimate Form */}
            <div id="estimate-form" className="scroll-mt-24 lg:col-span-8">
              <div className="border border-[#DCD6C8] bg-white p-6 sm:p-10">
                {receipt ? (
                  <div className="space-y-6 py-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center bg-[#3F523B]/10 text-[#3F523B]">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3F523B]">
                        Estimate Request Logged
                      </p>
                      <h2 className="font-display text-2xl font-semibold text-[#1E201D] sm:text-3xl">
                        Thank You — Your Request Has Been Recorded.
                      </h2>
                      <p className="text-base leading-relaxed text-[#5B5D56]">
                        Your project inquiry for{' '}
                        <span className="font-semibold text-[#1E201D]">
                          {serviceRequired}
                        </span>{' '}
                        has been saved to our estimate queue.
                        {receipt.photoSaved
                          ? ' Your uploaded project photo was also securely attached.'
                          : ''}
                      </p>
                    </div>

                    <dl className="grid grid-cols-1 gap-4 border border-[#DCD6C8] bg-[#EFECE4] p-5 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-[#5B5D56]">
                          Reference Number
                        </dt>
                        <dd className="mt-1 font-display font-semibold text-[#1E201D] tabular-nums">
                          {receipt.referenceId}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-[#5B5D56]">
                          Recorded At
                        </dt>
                        <dd className="mt-1 font-medium text-[#1E201D] tabular-nums">
                          {new Date(receipt.submittedAt).toLocaleString()}
                        </dd>
                      </div>
                    </dl>

                    <div className="border-t border-[#DCD6C8] pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-[#5B5D56]">
                        Need immediate help or want to text additional photos? Call or text{' '}
                        <a
                          href={BUSINESS_INFO.phoneHref}
                          className="font-semibold text-[#3F523B] underline tabular-nums"
                        >
                          {BUSINESS_INFO.phoneDisplay}
                        </a>
                        .
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex min-h-[44px] items-center justify-center border border-[#1E201D] px-5 py-2.5 text-sm font-semibold text-[#1E201D] hover:bg-[#EFECE4] cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="space-y-1.5 border-b border-[#DCD6C8] pb-5">
                      <h2 className="font-display text-2xl font-semibold text-[#1E201D]">
                        Request Your Free Estimate
                      </h2>
                      <p className="text-sm text-[#5B5D56]">
                        Share your project details below. Required fields are marked with *.
                      </p>
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 border border-[#B85D3B] bg-[#B85D3B]/10 p-4 text-sm text-[#7A351C]"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#B85D3B]"
                          aria-hidden="true"
                        />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-[#1E201D]"
                        >
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your name"
                          className="w-full min-h-[46px] border border-[#DCD6C8] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder:text-[#8E9087] focus:border-[#3F523B] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-[#1E201D]"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(702) 555-0199"
                          className="w-full min-h-[46px] border border-[#DCD6C8] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder:text-[#8E9087] focus:border-[#3F523B] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#1E201D]"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full min-h-[46px] border border-[#DCD6C8] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder:text-[#8E9087] focus:border-[#3F523B] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="propertyLocation"
                          className="block text-sm font-medium text-[#1E201D]"
                        >
                          Property Location (Las Vegas Area / ZIP) *
                        </label>
                        <input
                          id="propertyLocation"
                          name="propertyLocation"
                          type="text"
                          required
                          value={propertyLocation}
                          onChange={(e) => setPropertyLocation(e.target.value)}
                          placeholder="e.g., Summerlin / 89135"
                          className="w-full min-h-[46px] border border-[#DCD6C8] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder:text-[#8E9087] focus:border-[#3F523B] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="serviceRequired"
                          className="block text-sm font-medium text-[#1E201D]"
                        >
                          Service Required *
                        </label>
                        <select
                          id="serviceRequired"
                          name="serviceRequired"
                          value={serviceRequired}
                          onChange={(e) =>
                            setServiceRequired(e.target.value as ServiceOption)
                          }
                          className="w-full min-h-[46px] border border-[#DCD6C8] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#1E201D] focus:border-[#3F523B] focus:outline-none"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="projectSize"
                          className="block text-sm font-medium text-[#1E201D]"
                        >
                          Approximate Project Size (Optional)
                        </label>
                        <input
                          id="projectSize"
                          name="projectSize"
                          type="text"
                          value={projectSize}
                          onChange={(e) => setProjectSize(e.target.value)}
                          placeholder="e.g., 450 sq ft backyard or front walkway"
                          className="w-full min-h-[46px] border border-[#DCD6C8] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder:text-[#8E9087] focus:border-[#3F523B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="block text-sm font-medium text-[#1E201D]">
                        Preferred Contact Method
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {CONTACT_METHODS.map((method) => {
                          const active = preferredContact === method;
                          return (
                            <button
                              key={method}
                              type="button"
                              onClick={() => setPreferredContact(method)}
                              className={`min-h-[42px] px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                                active
                                  ? 'bg-[#3F523B] text-[#FAF8F4]'
                                  : 'border border-[#DCD6C8] bg-[#FAF8F4] text-[#5B5D56] hover:border-[#3F523B] hover:text-[#1E201D]'
                              }`}
                            >
                              {method}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-[#1E201D]"
                      >
                        Project Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your yard, what you would like installed or cleaned up, and any timing preferences."
                        className="w-full border border-[#DCD6C8] bg-[#FAF8F4] px-3.5 py-2.5 text-sm text-[#1E201D] placeholder:text-[#8E9087] focus:border-[#3F523B] focus:outline-none"
                      />
                    </div>

                    {/* Optional Yard Photo Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-[#1E201D]">
                        Yard Photograph (Optional · JPEG, PNG, or WebP up to 5 MB)
                      </label>
                      {!photoDataUrl ? (
                        <label className="flex min-h-[84px] cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-[#B5AF9F] bg-[#FAF8F4] p-4 text-center transition-colors hover:border-[#3F523B]">
                          <Upload className="h-5 w-5 text-[#3F523B]" aria-hidden="true" />
                          <span className="text-sm text-[#5B5D56]">
                            Click to attach a photo of your current yard or project area
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handlePhotoChange}
                            className="sr-only"
                          />
                        </label>
                      ) : (
                        <div className="flex items-center justify-between gap-4 border border-[#DCD6C8] bg-[#FAF8F4] p-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={photoDataUrl}
                              alt="Uploaded yard preview"
                              className="h-14 w-20 object-cover border border-[#DCD6C8] shrink-0"
                            />
                            <span className="truncate text-sm font-medium text-[#1E201D]">
                              {photoFileName}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={clearPhoto}
                            aria-label="Remove uploaded photo"
                            className="inline-flex h-10 w-10 items-center justify-center text-[#5B5D56] hover:text-[#1E201D] cursor-pointer shrink-0"
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                      {photoError && (
                        <p className="text-xs font-medium text-[#B85D3B]">{photoError}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex min-h-[50px] w-full items-center justify-center bg-[#3F523B] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#FAF8F4] transition-colors duration-200 hover:bg-[#32422E] disabled:opacity-60 cursor-pointer sm:w-auto"
                      >
                        {submitting ? 'Submitting Request...' : 'Request My Free Estimate'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
