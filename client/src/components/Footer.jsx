function Footer() {
  return (
    <footer className="bg-primary-700 text-light-50 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
        
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-secondary-400">Super General Pest Control</h3>
          <p>AI-Enhanced Pest Control Solutions.</p>
          <p>Smarter, faster support for pest-free peace of mind.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-secondary-400">Contact Us</h3>
          <p>Email: <a href="mailto:support@pestbot.com" className="hover:underline">support@pestbot.com</a></p>
          <p>Phone: (801) 000-1111</p>
          <p>Location: 123 Main St, YourCity, USA</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-secondary-400">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/book" className="hover:underline">Book Appointment</a></li>
            <li><a href="/account" className="hover:underline">My Account</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-xs text-light-200">
        <p>&copy; {new Date().getFullYear()} PestBot. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
