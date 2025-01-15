const Error = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-600 dark:text-red-400">
          Error
        </h1>
        <p className="mt-4 text-2xl text-red-700 dark:text-red-300">
          Something went wrong
        </p>
        <p className="mt-2 text-red-600 dark:text-red-200">
          {errorMessage ||
            "An unexpected error occurred. Please try again later."}
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Error;
