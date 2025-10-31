import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold text-secondary-900 mb-6">
            About Navrasi
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-3">
                Our Story
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Navrasi is a premium clothing brand dedicated to bringing you modern, stylish
                apparel for every occasion. Founded with a vision to make quality fashion
                accessible, we combine contemporary design with comfortable fabrics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-3">
                Our Mission
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                We believe fashion should be inclusive, sustainable, and affordable. Our mission
                is to provide high-quality clothing that empowers individuals to express their
                unique style with confidence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-secondary-900 mb-3">
                Quality Commitment
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                Every piece in our collection is carefully crafted with attention to detail.
                We source premium materials and work with skilled artisans to ensure each
                product meets our high standards of quality and durability.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
