export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="space-y-8 prose dark:prose-invert max-w-none">
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: November 24, 2025</p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            The FS Exam Study Guide ("we," "us," or "our") operates this application. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you use our study guide application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-2">We may collect information about you in a variety of ways:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Personal Data:</strong> Name, email address, and other information you provide during registration</li>
            <li><strong>Usage Data:</strong> Study progress, quiz results, exam scores, and time spent on lessons</li>
            <li><strong>Device Data:</strong> Browser type, IP address, and device information</li>
            <li><strong>Feedback:</strong> Any feedback, testimonials, or comments you provide</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-2">We use the collected information for various purposes:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Providing and maintaining the study guide service</li>
            <li>Tracking your study progress and performance</li>
            <li>Personalizing your study experience</li>
            <li>Responding to your feedback and inquiries</li>
            <li>Improving our service and user experience</li>
            <li>Analyzing usage patterns to enhance content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We implement appropriate technical and organizational security measures to protect your personal data
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
            over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your
            personal information, we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Our application uses Replit Authentication for user login and verification. We may share necessary
            information with these service providers to operate our application. These third parties are obligated
            to maintain the confidentiality of your information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-2">Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
            new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us through the feedback form on our application.
          </p>
        </section>
      </div>
    </div>
  );
}
