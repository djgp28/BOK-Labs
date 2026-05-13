// landing-app.jsx — root, composes all sections.

function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
