import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Disclaimer() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold text-secondary-900 mb-6">
            Disclaimer
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-3">
                General Information
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                The information provided on this website is for general informational purposes only.
                While we strive to keep the information accurate and up-to-date, we make no
                representations or warranties of any kind about the completeness or accuracy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-3">
                Product Variations
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Product colors may vary slightly from images due to lighting and screen settings.
                We do our best to display colors accurately but cannot guarantee exact matches.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-3">
                Limitation of Liability
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Navrasi shall not be liable for any indirect, incidental, or consequential damages
                arising from the use of our products or services.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
