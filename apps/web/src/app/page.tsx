export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to DriveMate
        </h1>
        <p className="text-center text-lg mb-8">
          Your trusted platform for professional chauffeur services
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-light-card dark:bg-dark-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">For Clients</h2>
            <p className="text-sm">
              Book professional chauffeurs for your personal vehicle
            </p>
          </div>
          <div className="p-6 bg-light-card dark:bg-dark-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">For Chauffeurs</h2>
            <p className="text-sm">
              Join our network of professional drivers
            </p>
          </div>
          <div className="p-6 bg-light-card dark:bg-dark-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">For Businesses</h2>
            <p className="text-sm">
              Enterprise solutions for corporate transportation
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 