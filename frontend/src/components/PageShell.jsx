function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-hero-gradient px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}

export default PageShell;
