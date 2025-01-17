import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center mt-52">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold">404</h1>
        <p className="mt-4 text-2xl">Page Not Found</p>
        <p className="mt-2 text-foreground-muted">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
