export default function DisclaimerPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="space-y-8 prose dark:prose-invert max-w-none">
        <div>
          <h1 className="text-3xl font-bold">Disclaimer</h1>
          <p className="text-muted-foreground mt-2">Last updated: November 24, 2025</p>
        </div>

        <section className="bg-muted p-4 rounded-lg border">
          <p className="text-base font-semibold text-foreground">
            IMPORTANT: Please read this disclaimer carefully before using the FS Exam Study Guide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">1. Educational Use Only</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            The FS Exam Study Guide is provided as an educational resource to help students prepare for the
            Fundamentals of Surveying (FS) exam administered by NCEES. This application is not affiliated with,
            endorsed by, or officially approved by NCEES. The content is designed based on publicly available
            information about the FS exam domains and should be supplemented with official NCEES materials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. No Guarantee of Success</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            While we strive to provide accurate and comprehensive study materials, we make no guarantee that
            using this study guide will result in passing the FS exam. Success depends on individual study effort,
            prior knowledge, and testing conditions. Exam results vary based on many factors beyond our control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Accuracy of Content</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We make reasonable efforts to ensure the accuracy of the study content, practice questions, and explanations.
            However, we do not warrant that all content is error-free or current. The surveying profession and exam
            specifications may change over time. Users are responsible for verifying critical information with official
            sources and their instructors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. No Professional Advice</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            This study guide provides educational content and is not a substitute for professional surveying education,
            training, or advice. It does not constitute legal, financial, or professional surveying advice. Users should
            consult with qualified educators, professional surveyors, and official NCEES resources for guidance on exam
            preparation and professional standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or inability to use the study guide,
            including but not limited to damages for lost profits, loss of data, or business interruption, even if
            advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Third-Party Content</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            This application may contain links to third-party websites and resources. We do not endorse or control
            these external sites and are not responsible for their content, accuracy, or practices. Use of third-party
            services is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Exam References</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            All references to the FS exam, NCEES, and surveying standards are based on publicly available information.
            Users should verify current exam specifications directly with NCEES at ncees.org. This guide is not
            affiliated with or endorsed by NCEES.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">8. User Responsibility</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            By using this study guide, you acknowledge that you are using it at your own risk and assume full
            responsibility for any outcomes, including exam results. You agree to use this application only for
            lawful purposes and in compliance with all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. Changes to Disclaimer</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon
            posting to the application. Your continued use of the study guide constitutes acceptance of updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            If you have questions about this disclaimer, please contact us through the feedback form in our application.
          </p>
        </section>
      </div>
    </div>
  );
}
