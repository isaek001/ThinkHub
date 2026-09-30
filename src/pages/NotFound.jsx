import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="gate">
      <h2>Page not found</h2>
      <p>That page does not exist. It may have been moved or renamed.</p>
      <Link className="btn b" to="/">
        <ArrowLeft size={16} aria-hidden="true" /> Back to the site
      </Link>
    </div>
  );
}
